require 'test_helper'

class ChildPullRequestTest < ActiveSupport::TestCase
  test 'valid' do
    split_pr_job = SplitPullRequestJob.new(\
      id: 1,\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )
    split_pr_job.save
    child_pr = ChildPullRequest.new(split_pull_request_job_id: 1, child_pr_id: 1)

    assert child_pr.valid?
  end

  test 'invalid when with split_pull_request_job_id is missing' do
    split_pr_job = SplitPullRequestJob.new(\
      id: 1,\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )
    split_pr_job.save

    child_pr = ChildPullRequest.new(child_pr_id: 1)
    assert child_pr.invalid?
    assert_not_nil child_pr.errors[:split_pull_request_job_id]
  end

  test 'invalid when child_pr_id is missing' do
    split_pr_job = SplitPullRequestJob.new(\
      id: 1,\
      parent_pr_id: 1,\
      split_initiated_by_user_id: 1,\
      repo_id: 'abc123'\
    )
    split_pr_job.save

    child_pr = ChildPullRequest.new(split_pull_request_job_id: 1)
    assert child_pr.invalid?
    assert_not_nil child_pr.errors[:child_pr_id]
  end

  test 'invalid when the coresponding split pull request job does not exist' do
    child_pr = ChildPullRequest.new(split_pull_request_job_id: 1, child_pr_id: 1)
    assert child_pr.invalid?
    assert_not_nil child_pr.errors[:split_pull_request_job_id]
  end
end
