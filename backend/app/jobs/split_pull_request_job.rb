require 'rugged'
require 'fileutils'
require 'open3'
require 'time'

def apply_patch(params)
  # !!! IMPORTANT !!!
  # We must ensure that the params which are exposed in the shell command are safe.
  # In this case, ensure that they are integers.
  unless params[:repo_id].is_a?(Integer) && params[:job_id].is_a?(Integer) \
                                      && params[:split_count].is_a?(Integer)
    raise Exception, 'apply_patch params are not safe.'
  end

  path_prefix = "tmp/splitity/repo-#{params[:repo_id]}/job-#{params[:job_id]}/pr-count-#{params[:split_count]}"
  git_repo_path = "#{path_prefix}/repo"
  patch_path = "#{path_prefix}/patch.diff"

  File.write(patch_path, params[:patch], mode: 'w')

  stdout, stderr, status = Open3.capture3("git -C '#{git_repo_path}' apply '../patch.diff' --unidiff-zero")
  logger.info("apply_patch stdout: '#{stdout}'") unless stdout.empty?

  raise Exception, "apply_patch git apply fail with exit code with stderr: '#{stderr}'" unless status.success?

  logger.warn("apply_patch git apply success with stderr: '#{stderr}'") unless stderr.empty?
end

# Job to split a PR
class SplitPullRequestJob < ApplicationJob
  queue_as :default

  def perform(*args)
    params = args[0]

    github_app = GithubAppService.new
    installation_token = github_app.repo_installation_token(
      params[:installation_id], params[:repo_id]
    )[:token]

    github = GithubService.new(access_token: installation_token)
    pr_info = github.pull_request(params[:repo_id], params[:pr_id])

    git_client_creds = Rugged::Credentials::UserPassword.new(
      username: params[:repo_owner],
      password: installation_token
    )

    # For each of the diff
    # Clone the repo
    # Create a new branch from the PR branch with the correct commit ref
    # apply diff
    repos = []

    params[:patches].each_with_index do |patch, split_count|
      path_prefix = "tmp/splitity/repo-#{params[:repo_id]}/job-#{params[:job_id]}/pr-count-#{split_count}"
      FileUtils.mkdir_p(path_prefix)
      git_clone_path = "#{path_prefix}/repo"
      repo = Rugged::Repository.clone_at(
        "https://github.com/#{params[:repo_owner]}/#{params[:repo_name]}.git",
        git_clone_path,
        credentials: git_client_creds
      )
      branch = repo.branches.create(
        "splitity/pull-request-#{params[:pr_id]}/job-#{params[:job_id]}/split-#{split_count}",
        pr_info[:base_sha]
      )
      repo.checkout(branch)

      apply_patch(
        repo_id: params[:repo_id].to_i,
        job_id: params[:job_id].to_i,
        split_count: split_count,
        patch: patch
      )

      repo.index.add_all
      repo.index.write

      options = {}
      options[:tree] = repo.index.write_tree(repo)
      options[:author] = { email: 'support@splitity.com', name: 'Splitity', time: Time.now.utc }
      options[:committer] = { email: 'support@splitity.com', name: 'Splitity', time: Time.now.utc }
      options[:message] = "Split PR ##{params[:pr_id]} number #{split_count}"
      options[:parents] = repo.empty? ? [] : [repo.head.target].compact
      options[:update_ref] = 'HEAD'

      Rugged::Commit.create(repo, options)

      repos.push(repo)
    end

    # For each of the diff
    # push and create a Pull Request
    repos.each_with_index do |repo, split_count|
      repo.push('origin', "refs/heads/splitity/pull-request-#{params[:pr_id]}/job-#{params[:job_id]}/split-#{split_count}", credentials: git_client_creds)
      github.create_pull_request(
        params[:repo_id],
        pr_info[:base_ref],
        "splitity/pull-request-#{params[:pr_id]}/job-#{params[:job_id]}/split-#{split_count}",
        "Split ##{params[:pr_id]} number #{split_count}"
      )
    end

    # Create split pr record, set the job as success and save
  end
end
