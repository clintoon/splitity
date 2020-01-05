# Model for the info for split pull request jobs
class SplitPullRequestJob < ApplicationRecord
  enum status: { pending: 0, in_progress: 1, success: 2, failed: 3 }
end
