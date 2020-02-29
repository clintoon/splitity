require 'octokit'

# To interact with the Github API
class GithubService
  def initialize(params)
    @client = Octokit::Client.new(
      access_token: params[:access_token],
      client_id: Rails.application.credentials.github[:client_id],
      client_secret: Rails.application.credentials.github[:client_secret]
    )
  end

  def current_user
    data = @client.user
    { id: data[:id], login: data[:login] }
  rescue Octokit::Unauthorized
    nil
  end

  # Takes in an hash with keys :id or :name and :owner
  def repository(repo)
    data = @client.repository(repo)
    { id: data[:id] }
  end

  def pull_request(repo, number)
    data = @client.pull_request(repo, number)
    { head_ref: data[:head][:ref], base_ref: data[:base][:ref], base_sha: data[:base][:sha], title: data[:title] }
  end

  def create_pull_request(repo, base, head, title, body = nil)
    data = @client.create_pull_request(repo, base, head, title, body)
    { number: data[:number] }
  end

  def permission_level(repo, collaborator)
    data = @client.permission_level(repo, collaborator)
    { permission: data[:permission] }
  end

  def add_comment_on_issue(repo:, number:, comment:)
    @client.add_comment(repo, number, comment)
    nil
  end

  def create_issue_comment_reaction(repo, issue_comment_id, reaction)
    @client.create_issue_comment_reaction(repo, issue_comment_id, reaction)
  end

  def app_installations_for_user
    @client.auto_paginate = true
    installations = @client.find_user_installations
    @client.auto_paginate = false

    installations
  end
end
