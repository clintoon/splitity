require 'test_helper'
require 'securerandom'

class PullRequestsControllerTest < ActionDispatch::IntegrationTest
  test 'splitting PR returns an unauthenticated status when Access-Token header is not set' do
    post(
      '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',
      params: { patches: ['example patch'] }
    )
    assert_response :unauthorized
  end

  test 'splitting PR returns an unauthenticated status when Access-Token header is not valid' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    invalid_access_token = 'invalid'

    post(
      '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',
      params: { patches: ['example patch'] },
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{invalid_access_token}" }
    )

    assert_response :unauthorized
  end

  test 'splitting PR returns an unauthenticated status when access token header has expired' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    invalid_access_token = EncryptionService.encrypt_and_sign('abc123', expires_in: 1.day, purpose: :login)

    Timecop.freeze(Time.zone.now + 2.days) do
      post(
        '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',
        params: { patches: ['example patch'] },
        headers: { 'HTTP_AUTHORIZATION': "Bearer #{invalid_access_token}" }
      )

      assert_response :unauthorized
    end
  end

  test 'splitting PR returns an unauthenticated status when access token header has not login purpose' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    invalid_access_token = EncryptionService.encrypt_and_sign('abc123')

    post(
      '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',
      params: { patches: ['example patch'] },
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{invalid_access_token}" }
    )

    assert_response :unauthorized
  end

  test 'splitting PR returns an unauthenticated status when github token is not valid' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    invalid_access_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    mock = Minitest::Mock.new
    mock.expect :current_user, nil

    GithubService.stubs(:new).returns(mock)
    post(
      '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',
      params: { patches: ['example patch'] },
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{invalid_access_token}" }
    )

    assert_response :unauthorized
    assert_mock mock
  end

  test 'splitting PR returns an 200 OK when Access-Token header is valid' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    valid_access_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    github_mock = Minitest::Mock.new
    github_mock.expect :current_user, id: 1, login: 'clintoon'
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]
    github_mock.expect :permission_level, { permission: 'write' }, [{ name: 'test01', owner: 'clintoon' }, 'clintoon']
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]

    github_app_mock = Minitest::Mock.new
    github_app_mock.expect :repo_installation_id, 'installation_id123', [{ name: 'test01', owner: 'clintoon' }]

    GithubAppService.stubs(:new).returns(github_app_mock)
    GithubService.stubs(:new).returns(github_mock)

    post(
      '/v1/repos/clintoon/test01/pulls/123/split',
      params: { patches: ['example patch'] },\
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{valid_access_token}" }
    )

    assert_response :success
    assert_mock github_mock
    assert_mock github_app_mock
  end

  test 'splitting PR returns an 200 OK when user has admin access' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    valid_access_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    github_mock = Minitest::Mock.new
    github_mock.expect :current_user, id: 1, login: 'clintoon'
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]
    github_mock.expect :permission_level, { permission: 'admin' }, [{ name: 'test01', owner: 'clintoon' }, 'clintoon']
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]

    github_app_mock = Minitest::Mock.new
    github_app_mock.expect :repo_installation_id, 'installation_id123', [{ name: 'test01', owner: 'clintoon' }]

    GithubAppService.stubs(:new).returns(github_app_mock)
    GithubService.stubs(:new).returns(github_mock)

    post(
      '/v1/repos/clintoon/test01/pulls/123/split',
      params: { patches: ['example patch'] },
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{valid_access_token}" }
    )

    assert_response :success
    assert_mock github_mock
    assert_mock github_app_mock
  end

  test 'splitting PR should return unauthorized if user does not have write access' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    valid_access_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    github_mock = Minitest::Mock.new
    github_mock.expect :current_user, id: 1, login: 'clintoon'
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]
    github_mock.expect :permission_level, { permission: 'read' }, [{ name: 'test01', owner: 'clintoon' }, 'clintoon']

    github_app_mock = Minitest::Mock.new

    GithubAppService.stubs(:new).returns(github_app_mock)
    GithubService.stubs(:new).returns(github_mock)

    post(
      '/v1/repos/clintoon/test01/pulls/123/split',
      params: { patches: ['example patch'] },
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{valid_access_token}" }
    )

    assert_response :unauthorized
    assert_mock github_mock
    assert_mock github_app_mock
  end

  test 'splitting PR should return forbidden if repo id has changed' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    valid_access_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    github_mock = Minitest::Mock.new
    github_mock.expect :current_user, id: 1, login: 'clintoon'
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]
    github_mock.expect :permission_level, { permission: 'write' }, [{ name: 'test01', owner: 'clintoon' }, 'clintoon']
    github_mock.expect :repository, { id: 2 }, [{ name: 'test01', owner: 'clintoon' }]

    github_app_mock = Minitest::Mock.new
    github_app_mock.expect :repo_installation_id, 'installation_id123', [{ name: 'test01', owner: 'clintoon' }]

    GithubAppService.stubs(:new).returns(github_app_mock)
    GithubService.stubs(:new).returns(github_mock)

    post(
      '/v1/repos/clintoon/test01/pulls/123/split',
      params: { patches: ['example patch'] },
      headers: { 'HTTP_AUTHORIZATION': "Bearer #{valid_access_token}" }
    )

    assert_response :forbidden
    assert_mock github_mock
    assert_mock github_app_mock
  end

  test 'get diff should return unauthorized if no auth header' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    get('/v1/repos/clintoon/test01/pulls/123/diff')

    assert_response :unauthorized
  end

  test 'get diff should return unauthorized if gh access token is not valid' do
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    invalid_auth_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    GithubService.any_instance.stubs(:current_user).returns(nil)

    get('/v1/repos/clintoon/test01/pulls/123/diff', { headers: { 'HTTP_AUTHORIZATION': "Bearer #{invalid_auth_token}" } })

    assert_response :unauthorized
  end

  test 'get diff should return success if auth token is valid' do
    Rails.application.credentials.stubs(:github).returns({ client_id: 'client_id', client_secret: 'client_secret' })

    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    valid_auth_token = EncryptionService.encrypt_and_sign('abc123', purpose: :login)

    GithubService.any_instance.stubs(:current_user).returns({ id: 123, login: 'clintoon' })
    GithubService.any_instance.stubs(:pull_request_diff).returns('diff123')
    GithubService.any_instance.stubs(:pull_request).returns({ title: 'pull request123' })

    get('/v1/repos/clintoon/test01/pulls/123/diff', { headers: { 'HTTP_AUTHORIZATION': "Bearer #{valid_auth_token}" } })

    parsed_resp = JSON.parse(@response.body)

    assert_response :success
    assert_equal parsed_resp['title'], 'pull request123'
    assert_equal parsed_resp['diff'], 'diff123'
  end
end
