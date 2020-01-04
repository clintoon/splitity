require 'octokit'

# To interact with the Github API
class GithubService
  def initialize(params)
    @client = Octokit::Client.new(access_token: params[:access_token])
  end

  def current_user
    @client.user
  rescue Octokit::Unauthorized
    nil
  end
end
