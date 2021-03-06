# Model for the info for split pull request jobs
class SplitPullRequestJobRecord < ApplicationRecord
  enum status: { queued: 0, success: 1, failed: 2 }

  has_many :child_pull_requests, dependent: :destroy

  # TODO(clinton): rename pr_id into pr_number
  validates :parent_pr_id, presence: true
  validates :split_initiated_by_user_id, presence: true
  validates :repo_id, presence: true
end
