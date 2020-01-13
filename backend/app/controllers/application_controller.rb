# Contains common filters for all controllers
class ApplicationController < ActionController::API
  private

  def login_required
    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    return head :unauthorized if access_token.nil?

    begin
      github = GithubService.new(access_token: access_token)
      current_user = github.current_user
      if current_user
        @current_user = current_user
      else
        head :unauthorized
      end
    rescue StandardError
      head :internal_server_error
    end
  end
end
