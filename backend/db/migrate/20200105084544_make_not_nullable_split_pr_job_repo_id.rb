class MakeNotNullableSplitPrJobRepoId < ActiveRecord::Migration[6.0]
  def change
    change_column_null :split_pull_request_jobs, :repo_id, false
  end
end
