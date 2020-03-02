require 'test_helper'

class AuthControllerTest < ActionDispatch::IntegrationTest
  test 'returns a token with 1 month expiry' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { access_token: 'abc123' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    assert_response :success

    Timecop.freeze(Time.zone.today + 27.days) do
      decrypted = EncryptionService.decrypt_and_verify(JSON.parse(@response.body)['access_token'])
      assert_equal(decrypted, 'abc123')
    end

    Timecop.freeze(Time.zone.today + 1.month + 1.day) do
      decrypted = EncryptionService.decrypt_and_verify(JSON.parse(@response.body)['access_token'])
      assert_nil decrypted
    end
  end

  test 'returns unauthenticated when code is invalid' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    mock_body = { error: 'bad_verification_code' }.to_json
    stub_request(:post, 'https://github.com/login/oauth/access_token').to_return(body: mock_body)

    post(
      '/v1/auth/login',
      params: { code: 'code123' }
    )

    assert_response :unauthorized
  end
end
