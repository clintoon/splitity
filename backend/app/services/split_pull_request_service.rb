# Splits pull requests
class SplitPullRequestService
  def queue_job(info)
    split_pr_job_record = SplitPullRequestJobRecord.create(
      repo_id: info[:repo_id],
      split_initiated_by_user_id: info[:split_initiated_by_user_id],
      parent_pr_id: info[:parent_pr_id]
    )

    SplitPullRequestJob.perform_later(
      job_id: split_pr_job_record.id,
      repo_id: info[:repo_id],
      pr_id: info[:parent_pr_id],
      repo_owner: info[:repo_owner],
      repo_name: info[:repo_name],
      patches: info[:patches],
      installation_id: info[:installation_id]
    )

    split_pr_job_record.id
  end
end
