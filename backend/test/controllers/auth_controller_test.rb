require 'test_helper'

class AuthControllerTest < ActionDispatch::IntegrationTest
  test 'returns a token with 1 month expiry' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { access_token: 'abc123' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    assert_response :success

    Timecop.freeze(Time.zone.today + 27.days) do
      decrypted = EncryptionService.decrypt_and_verify(JSON.parse(@response.body)['access_token'], purpose: :login)
      assert_equal(decrypted, 'abc123')
    end

    Timecop.freeze(Time.zone.today + 1.month + 1.day) do
      decrypted = EncryptionService.decrypt_and_verify(JSON.parse(@response.body)['access_token'], purpose: :login)
      assert_nil decrypted
    end
  end

  test 'returns a token with login purpose' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { access_token: 'abc123' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    assert_response :success

    decrypted = EncryptionService.decrypt_and_verify(JSON.parse(@response.body)['access_token'], purpose: :login)
    assert_equal(decrypted, 'abc123')

    invalid_decrypted = EncryptionService.decrypt_and_verify(JSON.parse(@response.body)['access_token'], purpose: :pizza)
    assert_nil(invalid_decrypted)
  end

  test 'returns unauthenticated when code is invalid' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { error: 'bad_verification_code' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    assert_response :unauthorized
  end

  test 'stores a new user and returns is_new_user to be true if user is new' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { access_token: 'abc123' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    parsed_resp = JSON.parse(@response.body)

    assert_not_nil User.find_by(provider_user_id: 123)
    assert_equal parsed_resp['is_new_user'], true
  end

  test 'returns is_new_user as false when user already exists' do
    User.create(provider_user_id: 123)

    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { access_token: 'abc123' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    parsed_resp = JSON.parse(@response.body)

    assert_equal parsed_resp['is_new_user'], false
  end
end
