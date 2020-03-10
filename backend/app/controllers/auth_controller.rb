require 'faraday'

class AuthController < ApplicationController
  def login
    session_code = params[:code]
    # TODO(clinton): Move to service class
    response = Faraday.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: Rails.application.credentials.github[:client_id],
        client_secret: Rails.application.credentials.github[:client_secret],
        code: session_code
      },
      {
        'Accept': 'application/json'
      }
    )
    access_token = JSON.parse(response.body)['access_token']

    return head :unauthorized if access_token.nil?

    encrypted = EncryptionService.encrypt_and_sign(access_token, expires_in: 1.month, purpose: :login)

    github = GithubService.new(access_token: access_token)
    gh_user_id = github.current_user[:id]
    provider_user_id = gh_user_id.to_s
    is_new_user = !User.exists?(provider_user_id: provider_user_id)

    if is_new_user
      new_user = User.new(provider_user_id: provider_user_id)
      new_user.save!
    end

    resp = { access_token: encrypted, is_new_user: is_new_user }
    render json: resp
  end
end
