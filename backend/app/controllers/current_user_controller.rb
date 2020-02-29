class CurrentUserController < ApplicationController
  def get
    access_token = session[:access_token]
    github = GithubService.new(access_token: access_token)
    user_info = github.current_user

    resp = user_id: user_info[:user_id]
    render json: resp
  end
end
