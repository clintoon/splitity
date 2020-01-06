require 'test_helper'

class ChildPullRequestTest < ActiveSupport::TestCase
  test 'valid' do
    create(:split_pull_request_job_record, id: 1)
    child_pr = build(:child_pull_request, split_pull_request_job_record_id: 1)

    assert child_pr.valid?
  end

  test 'invalid when with split_pull_request_job_record_id is missing' do
    child_pr = build(:child_pull_request, split_pull_request_job_record_id: nil)

    assert child_pr.invalid?
    assert_not_nil child_pr.errors[:split_pull_request_job_record_id]
  end

  test 'invalid when child_pr_id is missing' do
    create(:split_pull_request_job_record, id: 1)
    child_pr = build(:child_pull_request, split_pull_request_job_record_id: 1, child_pr_id: nil)

    assert child_pr.invalid?
    assert_not_nil child_pr.errors[:child_pr_id]
  end

  test 'invalid when the coresponding split pull request job does not exist' do
    child_pr = build(:child_pull_request, split_pull_request_job_record_id: 1, child_pr_id: 1)

    assert child_pr.invalid?
    assert_not_nil child_pr.errors[:split_pull_request_job_record_id]
  end
end
