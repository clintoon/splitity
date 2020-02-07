require 'openssl'
require 'jwt'
require 'octokit'

# Interact with github on behalf of the app (not the user)
class GithubAppService
  def initialize
    app_id = Rails.application.credentials.github[:app_id]
    private_pem = Rails.application.credentials.github[:private_key]
    jwt = generate_jwt(private_pem: private_pem, app_id: app_id)
    @client = Octokit::Client.new(bearer_token: jwt)
  end

  def repo_installation_id(repo)
    installation_id = @client.find_repository_installation(
      "#{repo[:owner]}/#{repo[:name]}"
    )[:id]
    installation_id
  end

  def repo_installation_token(installation_id, repo_id)
    data = @client.create_app_installation_access_token(
      installation_id, repository_ids: [repo_id]
    )
    { token: data[:token] }
  end

  private

  def generate_jwt(params)
    private_key = OpenSSL::PKey::RSA.new(params[:private_pem])

    payload = {
      # issued at time
      iat: Time.now.to_i,
      # JWT expiration time (2 minute)
      exp: Time.now.to_i + (2 * 60),
      # GitHub App's identifier
      iss: params[:app_id]
    }

    JWT.encode(payload, private_key, 'RS256')
  end
end
