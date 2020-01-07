# Controller to split pull requests
class PullRequestsController < ApplicationController
  before_action :login_required

  def split
    owner, repo_name, pr_id, patches = params.values_at(:owner, :repo_name, :pull_request_id, :patches)
    user_id = @current_user[:id]

    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    github = GithubService.new(access_token: access_token)
    repo_id = github.repository(owner: owner, name: repo_name)[:id]

    split_pr_job_record = SplitPullRequestJobRecord.new(
      repo_id: repo_id,
      split_initiated_by_user_id: user_id,
      parent_pr_id: pr_id
    )

    SplitPullRequestJob.perform_now(
      job_id: split_pr_job_record.id,
      repo_id: repo_id,
      pr_id: pr_id,
      initiated_by_user_id: user_id,
      patches: patches
    )

    split_pr_job_record.save!
    render json: { split_pull_request_job_id: split_pr_job_record.id }
  end
end
