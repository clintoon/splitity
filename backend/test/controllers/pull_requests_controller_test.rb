require 'test_helper'

class PullRequestsControllerTest < ActionDispatch::IntegrationTest
  test 'splitting PR returns an unauthenticated status when Access-Token header is not set' do
    post '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',\
         params: { patches: ['example patch'] }
    assert_response :unauthorized
  end

  test 'splitting PR returns an unauthenticated status when Access-Token header is not valid' do
    invalid_access_token = 'abc123'

    mock = Minitest::Mock.new
    mock.expect :current_user, nil

    GithubService.stub(:new, mock) do
      post '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split',\
           params: { patches: ['example patch'] },\
           headers: { 'HTTP_ACCESS_TOKEN': invalid_access_token }
    end

    assert_response :unauthorized
    assert_mock mock
  end

  test 'splitting PR returns an 200 OK when Access-Token header is valid' do
    valid_access_token = 'abc123'

    github_mock = Minitest::Mock.new
    github_mock.expect :current_user, id: 1, login: 'clintoon'
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]
    github_mock.expect :permission_level, { permission: 'write' }, [{ name: 'test01', owner: 'clintoon' }, 'clintoon']
    github_mock.expect :repository, { id: 1 }, [{ name: 'test01', owner: 'clintoon' }]

    github_app_mock = Minitest::Mock.new
    github_app_mock.expect :repo_installation_id, 'installation_id123', [{ name: 'test01', owner: 'clintoon' }]

    GithubAppService.stub(:new, github_app_mock) do
      GithubService.stub(:new, github_mock) do
        post '/v1/repos/clintoon/test01/pulls/123/split',\
             params: { patches: ['example patch'] },\
             headers: { 'HTTP_ACCESS_TOKEN': valid_access_token }
      end
    end

    assert_response :success
    assert_mock github_mock
    assert_mock github_app_mock
  end
end
