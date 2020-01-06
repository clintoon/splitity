require 'test_helper'

class SplitPullRequestJobRecordTest < ActiveSupport::TestCase
  test 'valid SplitPullRequestJobRecord with status queued' do
    split_pr_job = build(:split_pull_request_job_record)

    assert split_pr_job.valid?
  end

  test 'invalid SplitPullRequestJobRecord without parent_pr_id value' do
    split_pr_job = build(:split_pull_request_job_record)
    split_pr_job.parent_pr_id = nil

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:parent_pr_id]
  end

  test 'invalid SplitPullRequestJobRecord without split_initiated_by_user_id value' do
    split_pr_job = build(:split_pull_request_job_record)
    split_pr_job.split_initiated_by_user_id = nil

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:split_initiated_by_user_id]
  end

  test 'invalid SplitPullRequestJobRecord without repo_id value' do
    split_pr_job = build(:split_pull_request_job_record)
    split_pr_job.repo_id = nil

    assert split_pr_job.invalid?
    assert_not_nil split_pr_job.errors[:repo_id]
  end

  test 'SplitPullRequestJobRecord by default is queued' do
    split_pr_job = build(:split_pull_request_job_record)

    assert split_pr_job.queued?
  end

  test 'SplitPullRequestJobRecord can set state to success' do
    split_pr_job = build(:split_pull_request_job_record)
    split_pr_job.status = 'success'

    assert split_pr_job.success?
    assert_not split_pr_job.queued?
    assert split_pr_job.valid?
  end

  test 'SplitPullRequestJobRecord can set state to failed' do
    split_pr_job = build(:split_pull_request_job_record)
    split_pr_job.status = 'failed'

    assert split_pr_job.failed?
    assert_not split_pr_job.queued?
    assert split_pr_job.valid?
  end

  test 'SplitPullRequestJobRecord can have multiple child pull requests' do
    split_pr_job = create(:split_pull_request_job_record)
    child_pr1 = build(:child_pull_request)
    child_pr2 = build(:child_pull_request)
    split_pr_job.child_pull_requests << [child_pr1, child_pr2]

    result = SplitPullRequestJobRecord.last.child_pull_requests
    assert result == [child_pr1, child_pr2]
  end

  test 'SplitPullRequestJobRecord destroys associated child pull requests when destroyed' do
    split_pr_job = create(:split_pull_request_job_record)
    child_pr1 = build(:child_pull_request)
    child_pr2 = build(:child_pull_request)
    split_pr_job.child_pull_requests << [child_pr1, child_pr2]

    split_pr_job.destroy
    assert_equal ChildPullRequest.count, 0
  end
end
