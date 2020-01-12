require 'openssl'
require 'jwt'
require 'octokit'

# Interact with github on behalf of the app (not the user)
class GithubAppService
  def initialize
    gh_pem_path = 'config/github-app.pem'
    app_id = Rails.application.credentials.github[:app_id]
    jwt = get_jwt(pem_path: gh_pem_path, app_id: app_id)
    @client = Octokit::Client.new(bearer_token: jwt)
  end

  # TODO(clinton): need to only have write permission to passed in repo
  def repo_installation_token(repo)
    installation_id = @client.find_repository_installation(
      "#{repo[:owner]}/#{repo[:name]}"
    )[:id]
    data = @client.create_app_installation_access_token(
      installation_id, repository_ids: [repo[:id]]
    )
    { token: data[:token] }
  end

  private

  def get_jwt(params)
    private_pem = File.read(params[:pem_path])
    private_key = OpenSSL::PKey::RSA.new(private_pem)

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
