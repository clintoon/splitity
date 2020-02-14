class GithubEventsController < ApplicationController
  before_action :github_hook_payload_validated

  def notify
    event_type = request.headers['X-Github-Event']
    case event_type
    when 'issue_comment'
      handle_issue_comment_event(
        action: request.request_parameters[:action],
        issue: params[:issue],
        comment: params[:comment],
        repo: params[:repository],
        installation: params[:installation]
      )
    end
  end

  private

  def split_pull_request_comment?(action:, issue:, comment:)
    # Check that the issue is a PR and that the comment is starts with '@splitity split'
    action == 'created' && issue.key?(:pull_request) && comment[:body].strip.starts_with?('@splitity split')
  end

  def handle_issue_comment_event(action:, issue:, comment:, repo:, installation:)
    return unless split_pull_request_comment?(
      action: action,
      issue: issue,
      comment: comment
    )

    repo_owner = repo[:owner][:login]
    repo_name = repo[:name]
    pr_id = issue[:number]
    repo_id = repo[:id]
    installation_id = installation[:id]

    web_url = Rails.application.credentials.frontend_web[:url]

    link = "#{web_url}/gh/#{repo_owner}/#{repo_name}/pull/#{pr_id}"

    issue_comment_id = comment[:id]
    issue_created_by_user_id = comment[:user][:id]

    tracker = TrackerService.new(issue_created_by_user_id.to_s)
    tracker.track('comment_request_split_pull_request_link',
                  installation_id: installation_id)

    # Start job to comment and thumbs up the comment
    CommentSplitPullRequestLinkJob.perform_later(
      pr_id: pr_id,
      link: link,
      repo_id: repo_id,
      installation_id: installation_id,
      issue_comment_id: issue_comment_id
    )
  end
end
