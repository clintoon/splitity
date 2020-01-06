class RenameSplitPrJobTable < ActiveRecord::Migration[6.0]
  def change
    rename_table :split_pull_request_jobs, :split_pull_request_job_records
  end
end
