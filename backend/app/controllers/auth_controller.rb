require 'rest-client'

class AuthController < ApplicationController
  def login
    session_code = params[:code]

    # TODO(clinton): Move to service class
    response = RestClient.post('https://github.com/login/oauth/access_token',
                               { client_id: Rails.application.credentials.github[:client_id],
                                 client_secret: Rails.application.credentials.github[:client_secret],
                                 code: session_code },
                               accept: :json)
    access_token = JSON.parse(response)['access_token']

    session[:access_token] = access_token

    head :no_content
  end

  def logout
    session.clear
    head :no_content
  end
end
