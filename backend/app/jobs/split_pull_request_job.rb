# Job to split a PR
class SplitPullRequestJob < ApplicationJob
  queue_as :default

  def perform(*args)
    params = args[0]

    job_id, repo_id, pr_id, initiated_by_user_id, repo_owner, repo_name, patches = \
      params.values_at(:job_id, :repo_id, :pr_id, :initiated_by_user_id, \
                       :repo_owner, :repo_name, :patches)

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
