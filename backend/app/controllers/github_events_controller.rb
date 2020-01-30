class GithubEventsController < ApplicationController
  def notify
    event_type = request.headers['X-Github-Event']
    # TODO(clinton): verify that this request is from github (use secret)
    case event_type
    when 'issue_comment'
      handle_issue_comment_event(
        action: request.request_parameters[:action],
        issue: params[:issue],
        comment: params[:comment],
        repo: params[:repository]
      )
    else
      head :not_found
    end
  end

  private

  def split_pull_request_comment?(action:, issue:, comment:)
    # Check that the issue is a PR and that the comment is starts with '@splitity split'
    action == 'created' && issue.key?(:pull_request) && comment[:body].strip.starts_with?('@splitity split')
  end

  def handle_issue_comment_event(action:, issue:, comment:, repo:)
    return unless split_pull_request_comment?(
      action: action,
      issue: issue,
      comment: comment
    )

    repo_owner = repo[:owner][:login]
    repo_name = repo[:name]
    pr_id = issue[:number]

    web_url = Rails.application.credentials.frontend_web[:url]

    link = "#{web_url}/gh/#{repo_owner}/#{repo_name}/pull/#{pr_id}"

    issue_comment_id = comment[:id]

    # Start job to comment and thumbs up the comment

    puts link, issue_comment_id
  end
end
