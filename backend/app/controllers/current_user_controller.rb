class CurrentUserController < ApplicationController
  before_action :login_required

  def user_info
    resp = { user_id: @current_user[:id] }
    render json: resp
  end

  def github_app_installations
    github = GithubService.new(access_token: @github_access_token)
    installations = github.app_installations_for_user[:installations]

    formatted_installations = installations.map do |installation|
      {
        github_app_id: installation.id,
        account_id: installation.account.id
      }
    end
    render json: { installations: formatted_installations }
  end
end
