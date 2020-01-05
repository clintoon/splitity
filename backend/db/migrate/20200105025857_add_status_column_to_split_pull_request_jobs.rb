class AddStatusColumnToSplitPullRequestJobs < ActiveRecord::Migration[6.0]
  def change
    add_column :split_pull_request_jobs, :status, :integer
  end
end
