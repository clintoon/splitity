require 'faraday'

# TODO(clinton): Write unit tests
class AuthController < ApplicationController
  def login
    session_code = params[:code]
    # TODO(clinton): Move to service class and migrate to faraday
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

    return head :internal_server_error if access_token.nil?

    encrypted = EncryptionService.encrypt_and_sign(access_token, expires_in: 1.month)

    resp = { access_token: encrypted }
    render json: resp
  end
end
