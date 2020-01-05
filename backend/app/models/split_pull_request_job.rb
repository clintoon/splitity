# Model for the info for split pull request jobs
class SplitPullRequestJob < ApplicationRecord
  enum status: { queued: 0, success: 1, failed: 2 }

  validates :parent_pull_request_id, presence: true
  validates :split_initiated_by_user_id, presence: true
  validates :repo_owner_user_id, presence: true
end
