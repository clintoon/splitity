require 'test_helper'

class SplitPullRequestJobTest < ActiveSupport::TestCase
  test 'valid SplitPullRequestJob with status queued' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    assert split_pr_job.valid?
  end

  test 'invalid SplitPullRequestJob without parent_pr_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:parent_pr_id]
  end

  test 'invalid SplitPullRequestJob without split_initiated_by_user_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pr_id: 1,\
      repo_id: 'abc123'\
    )

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:split_initiated_by_user_id]
  end

  test 'invalid SplitPullRequestJob without repo_id value' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1\
    )

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:repo_id]
  end

  test 'SplitPullRequestJob by default is queued' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    assert split_pr_job.queued?
  end

  test 'SplitPullRequestJob can set state to success' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    split_pr_job.status = 'success'
    assert split_pr_job.success?
    assert_not split_pr_job.queued?
    assert split_pr_job.valid?
  end

  test 'SplitPullRequestJob can set state to failed' do
    split_pr_job = SplitPullRequestJob.new(\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    split_pr_job.status = 'failed'
    assert split_pr_job.failed?
    assert_not split_pr_job.queued?
    assert split_pr_job.valid?
  end

  test 'SplitPullRequestJob can have multiple child pull requests' do
    split_pr_job = SplitPullRequestJob.new(\
      id: 1, \
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    split_pr_job.save

    child_pr1 = ChildPullRequest.new(child_pr_id: 1)
    child_pr2 = ChildPullRequest.new(child_pr_id: 2)

    split_pr_job.child_pull_requests << [child_pr1, child_pr2]

    result = SplitPullRequestJob.last.child_pull_requests
    assert result == [child_pr1, child_pr2]
  end

  test 'SplitPullRequestJob destroys associated child pull requests when destroyed' do
    split_pr_job = SplitPullRequestJob.new(\
      id: 1, \
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )

    split_pr_job.save

    child_pr1 = ChildPullRequest.new(child_pr_id: 1)
    child_pr2 = ChildPullRequest.new(child_pr_id: 2)

    split_pr_job.child_pull_requests << [child_pr1, child_pr2]

    split_pr_job.destroy
    assert_equal ChildPullRequest.count, 0
  end
end
