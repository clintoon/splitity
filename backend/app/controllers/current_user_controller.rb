class CurrentUserController < ApplicationController
  before_action :login_required

  def get
    resp = { user_id: @current_user[:id] }
    render json: resp
  end
end
