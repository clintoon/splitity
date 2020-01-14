class RepoIdToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :split_pull_request_job_records, :repo_id, :integer
  end
end
