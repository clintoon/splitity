# Job to split a PR
class SplitPullRequestJob < ApplicationJob
  queue_as :default

  def perform(*args)
    params = args[0]

    # For each of the diff
    # Clone the repo
    # Create a new branch from the PR branch
    # apply diff

    # For each of the diff
    # create a Pull Request
    # Make an comment referencing the parent PR

    # Create split pr record, set the job as success and save
  end
end
