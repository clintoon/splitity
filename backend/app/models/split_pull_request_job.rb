# Model for the info for split pull request jobs
class SplitPullRequestJob < ApplicationRecord
  enum status: { pending: 0, in_progress: 1, success: 2, failed: 3 }

  validates :parent_pull_request_id, presence: true
  validates :split_initiated_by_user_id, presence: true
  validates :repo_owner_user_id, presence: true
end
