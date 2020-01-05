class MakeStatusColumnDefaultPending2ToSplitPullRequestJobs < ActiveRecord::Migration[6.0]
  def change
    change_column :split_pull_request_jobs, :status, :integer, default: 0, null: false
  end
end
