# Controller to split pull requests
class PullRequestsController < ApplicationController
  before_action :login_required

  def split
    user_write_repo_access_required(owner: params[:owner], name: params[:repo_name])

    github = GithubService.new(access_token: request.headers[:HTTP_ACCESS_TOKEN])
    repo = github.repository(owner: params[:owner], name: params[:repo_name])

    github_app = GithubAppService.new
    installation_id = github_app.repo_installation_id(
      owner: params[:owner],
      name: params[:repo_name]
    )
    repo_id_unchanged_required({ owner: params[:owner],
                                 name: params[:repo_name] }, repo[:id])

    split_pr = SplitPullRequestService.new
    split_pr_job_id = split_pr.queue_job(
      repo_id: repo[:id],
      parent_pr_id: params[:pull_request_id],
      repo_owner: params[:owner],
      repo_name: params[:repo_name],
      patches: params[:patches],
      installation_id: installation_id,
      split_initiated_by_user_id: @current_user[:id]
    )

    render json: { split_pull_request_job_id: split_pr_job_id }
  end

  private

  def user_write_repo_access_required(repo)
    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    github = GithubService.new(access_token: access_token)

    permission = github.permission_level(repo, @current_user[:login])[:permission]
    can_write = %w[write admin].include?(permission)

    return head :unauthorized unless can_write
  end

  def repo_id_unchanged_required(repo, id)
    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    github = GithubService.new(access_token: access_token)

    fetched_repo_id = github.repository(repo)[:id]
    has_changed = fetched_repo_id != id
    head :forbidden if has_changed && !fetched_repo_id.nil?
  end
end
