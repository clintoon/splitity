require 'test_helper'

class SplitPullRequestJobTest < ActiveSupport::TestCase
  test 'valid SplitPullRequestJob with status queued' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1\
    )

    assert split_pr_job.valid?
  end

  test 'invalid SplitPullRequestJob without parent_pull_request_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1\
    )

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:parent_pull_request_id]
  end

  test 'invalid SplitPullRequestJob without split_initiated_by_user_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      repo_owner_user_id: 1\
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

  test 'SplitPullRequestJob by default is queued' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1\
    )

    assert split_pr_job.queued?
  end

  test 'SplitPullRequestJob can set state to success' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1\
    )

    split_pr_job.status = 'success'
    assert split_pr_job.success?
    assert_not split_pr_job.queued?
    assert split_pr_job.valid?
  end

  test 'SplitPullRequestJob can set state to failed' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pull_request_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_owner_user_id: 1\
    )

    split_pr_job.status = 'failed'
    assert split_pr_job.failed?
    assert_not split_pr_job.queued?
    assert split_pr_job.valid?
  end
end
