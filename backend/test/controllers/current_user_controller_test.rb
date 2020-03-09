require 'test_helper'

class CurrentUserControllerTest < ActionDispatch::IntegrationTest
  test 'user_info returns unauthorized when auth header is invalid' do
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    GithubService.any_instance.stubs(:current_user).returns(nil)

    get('/v1/current_user', { headers: { 'HTTP_AUTHORIZATION': 'Bearer abc123' } })

    assert_response :unauthorized
  end

  test 'user_info returns unauthorized when gh access token is invalid' do
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    invalid_auth_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    GithubService.any_instance.stubs(:current_user).returns(nil)

    get('/v1/current_user', { headers: { 'HTTP_AUTHORIZATION': "Bearer #{invalid_auth_token}" } })

    assert_response :unauthorized
  end

  test 'user_info returns success when auth token is valid' do
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    valid_auth_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })

    get('/v1/current_user', { headers: { 'HTTP_AUTHORIZATION': "Bearer #{valid_auth_token}" } })

    parsed_resp = JSON.parse(@response.body)

    assert_response :success
    assert_equal parsed_resp['user_id'], 123
  end
end
