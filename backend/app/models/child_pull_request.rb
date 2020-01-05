# Model for the child PRs created by splitting the parent PR
class ChildPullRequest < ApplicationRecord
  belongs_to :split_pull_request_job
end
