require 'test_helper'

class PullRequestsControllerTest < ActionDispatch::IntegrationTest
  test 'splitting PR returns an unauthenticated status when Access-Token header is not set' do
    post '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split', params: { owner: 'clintoon', repo_name: 'test01', pull_request_id: '123' }
    assert_response :unauthorized
  end

  test 'splitting PR returns an unauthenticated status when Access-Token header is not valid' do
    mock = Minitest::Mock.new
    def mock.current_user
      nil
    end

    GithubService.stub(:new, mock) do
      post '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split', params: { owner: 'clintoon', repo_name: 'test01', pull_request_id: '123' }, headers: { 'HTTP_ACCESS_TOKEN': 'abc123' }
      assert_response :unauthorized
    end
  end

  test 'splitting PR returns an 200 OK when Access-Token header is valid' do
    mock = Minitest::Mock.new
    def mock.current_user
      true
    end

    GithubService.stub(:new, mock) do
      post '/v1/repos/:owner/:repo_name/pulls/:pull_request_id/split', params: { owner: 'clintoon', repo_name: 'test01', pull_request_id: '123' }, headers: { 'HTTP_ACCESS_TOKEN': 'abc123' }
      assert_response :success
    end
  end
end
