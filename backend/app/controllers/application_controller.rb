# Contains common filters for all controllers
class ApplicationController < ActionController::API
  private

  def login_required
    current_user = AuthHelpers.current_user(request.headers[:HTTP_ACCESS_TOKEN])
    if current_user
      @current_user = current_user
    else
      head :unauthorized
    end
  end
end
