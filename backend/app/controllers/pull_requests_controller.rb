class PullRequestsController < ApplicationController
  before_action :login_required

  def split
    github = GithubService.new(access_token: @github_access_token)
    github_app = GithubAppService.new

    repo = github.repository(owner: params[:owner], name: params[:repo_name])
    return head :not_found if repo[:id].nil?

    can_write = user_write_repo_access?(owner: params[:owner], name: params[:repo_name])
    return head :unauthorized unless can_write

    installation_id = github_app.repo_installation_id(
      owner: params[:owner],
      name: params[:repo_name]
    )
    refetched_repo = github.repository(owner: params[:owner], name: params[:repo_name])
    return head :forbidden unless refetched_repo[:id] == repo[:id]

    split_pr = SplitPullRequestService.new
    split_pr_job_id = split_pr.queue_job(
      repo_id: repo[:id],
      parent_pr_id: params[:pull_request_id],
      repo_owner: params[:owner],
      repo_name: params[:repo_name],
      patches: EncryptionService.new.encrypt(params[:patches]),
      installation_id: installation_id,
      split_initiated_by_user_id: @current_user[:id]
    )

    render json: { split_pull_request_job_id: split_pr_job_id }
  end

  # TODO(clinton): Write unit tests
  def get_diff
    github = GithubService.new(access_token: @github_access_token)

    diff = github.pull_request_diff(
      owner: params[:owner],
      repo_name: params[:repo_name],
      pull_request_id: params[:pull_request_id]
    )
    pr_info = github.pull_request(
      { name: params[:repo_name], owner: params[:owner] },
      params[:pull_request_id]
    )

    render json: {
      title: pr_info[:title],
      diff: diff
    }
  end

  private

  def user_write_repo_access?(repo)
    github = GithubService.new(access_token: @github_access_token)

    permission = github.permission_level(repo, @current_user[:login])[:permission]
    %w[write admin].include?(permission)
  end
end
