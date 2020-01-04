require 'octokit'

# Helpers related to authentication
module AuthHelpers
  def self.current_user(access_token)
    return nil if access_token.nil?

    begin
      github = GithubService.new(access_token: access_token)
      github.current_user
    rescue Octokit::Unauthorized
      nil
    end
  end
end
