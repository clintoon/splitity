class MakeStatusColumnDefaultPendingToSplitPullRequestJobs < ActiveRecord::Migration[6.0]
  def change
    change_column_null :split_pull_request_jobs, :status, false, 0
  end
end
