class CommentSplitPullRequestLinkJob < ApplicationJob
  queue_as :default

  def perform(
    pr_id:,
    link:,
    repo_id:,
    installation_id:,
    issue_comment_id:
  )
    github_app = GithubAppService.new
    installation_token = github_app.repo_installation_token(
      installation_id,
      repo_id
    )[:token]

    github = GithubService.new(access_token: installation_token)

    github.create_issue_comment_reaction(repo_id, issue_comment_id, '+1')

    github.add_comment_on_issue(
      repo: repo_id,
      number: pr_id,
      comment: "[Click me](#{link}) to split this pull request!"
    )
  end
end
