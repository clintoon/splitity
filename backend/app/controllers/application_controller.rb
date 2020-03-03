# Contains common filters for all controllers
class ApplicationController < ActionController::API
  private

  def login_required
    authorization = request.headers[:HTTP_AUTHORIZATION]
    return head :unauthorized if authorization.nil?

    token = authorization.split(' ').last

    begin
      @github_access_token = EncryptionService.decrypt_and_verify(token, purpose: :login)
    rescue ActiveSupport::MessageEncryptor::InvalidMessage, ActiveSupport::MessageVerifier::InvalidSignature
      return head :unauthorized
    end

    return head :unauthorized if @github_access_token.nil?

    begin
      github = GithubService.new(access_token: @github_access_token)
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

  # Based off https://developer.github.com/webhooks/securing/
  def verify_github_signature(payload_body)
    signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), Rails.application.credentials.github[:webhook_secret], payload_body)
    head :unauthorized unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_HUB_SIGNATURE'])
  end

  def github_hook_payload_validated
    request.body.rewind
    payload_body = request.body.read
    verify_github_signature(payload_body)
  end
end
