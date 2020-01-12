# Controller to split pull requests
class PullRequestsController < ApplicationController
  before_action :login_required

  def split
    owner, repo_name, pr_id, patches = params.values_at(:owner, :repo_name, :pull_request_id, :patches)
    user_id = @current_user[:id]

    # TODO(clinton): probably should refactor this so that it is a method
    # of github_service
    # Should ensure that the repo hasn't change for this as well.
    # get to have a repo id before and fetch it again after to check that it hasn't changed
    # so we can confirm that this is valid
    user_write_permissions_required(owner: owner, name: repo_name)

    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    github = GithubService.new(access_token: access_token)
    repo_id = github.repository(owner: owner, name: repo_name)[:id]

    split_pr_job_record = SplitPullRequestJobRecord.create(
      repo_id: repo_id,
      split_initiated_by_user_id: user_id,
      parent_pr_id: pr_id
    )

    SplitPullRequestJob.perform_later(
      job_id: split_pr_job_record.id,
      repo_id: repo_id,
      pr_id: pr_id,
      repo_owner: owner,
      repo_name: repo_name,
      patches: patches
    )

    render json: { split_pull_request_job_id: split_pr_job_record.id }
  end
end
