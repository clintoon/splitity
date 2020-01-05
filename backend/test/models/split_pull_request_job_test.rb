require 'test_helper'

class SplitPullRequestJobTest < ActiveSupport::TestCase
  test 'valid SplitPullRequestJob' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1
    )
    assert split_pr_job.valid?, ''
  end

  test 'invalid SplitPullRequestJob without parent_pull_request_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1
    )
    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:parent_pull_request_id]
  end

  test 'invalid SplitPullRequestJob without split_initiated_by_user_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      repo_owner_user_id: 1
    )
    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:split_initiated_by_user_id]
  end

  test 'invalid SplitPullRequestJob without repo_owner_user_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      split_initiated_by_user_id: 1\
    )
    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:repo_owner_user_id]
  end
end
