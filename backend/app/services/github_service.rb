require 'octokit'

# To interact with the Github API
class GithubService
  def initialize(params)
    @client = Octokit::Client.new(access_token: params[:access_token])
  end

  def current_user
    data = @client.user
    { id: data[:id] }
  rescue Octokit::Unauthorized
    nil
  end

  # Takes in an hash with keys :id or :name and :owner
  def repository(params)
    data = @client.repository(params)
    { id: data[:id] }
  end

  def pull_request(repo, number)
    data = @client.pull_request(repo, number)
    { head_ref: data[:head][:ref], base_ref: data[:base][:ref], base_sha: data[:base][:sha] }
  end

  def create_pull_request(repo, base, head, title, body = nil)
    @client.create_pull_request(repo, base, head, title, body)
  end
end
