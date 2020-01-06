# Job to split a PR
class SplitPullRequestJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
  end
end
