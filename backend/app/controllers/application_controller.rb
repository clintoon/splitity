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

  # Gets the write token of current for a repo if has write or admin permission
  def user_write_permissions_required(repo)
    return head :unauthorized if @current_user.nil?

    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    github = GithubService.new(access_token: access_token)
    permission = github.permission_level(repo, @current_user[:login])[:permission]

    return head :unauthorized unless %w[write admin].include?(permission)
  end
end
