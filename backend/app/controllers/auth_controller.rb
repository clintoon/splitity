require 'rest-client'
require 'jwe'

# TODO(clinton): Write unit tests
class AuthController < ApplicationController
  def login
    session_code = params[:code]
    # TODO(clinton): Move to service class and migrate to faraday
    response = RestClient.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: Rails.application.credentials.github[:client_id],
        client_secret: Rails.application.credentials.github[:client_secret],
        code: session_code
      },
      accept: :json
    )
    access_token = JSON.parse(response)['access_token']

    return head :internal_server_error if access_token.nil?

    # Generate JWE
    encrypted = JWE.encrypt(access_token, Rails.application.credentials.encryption_key, alg: 'dir')

    resp = { access_token: encrypted }
    render json: resp
  end
end
