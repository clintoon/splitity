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
end
