class MakeColumnsNotNullableSplitPullRequestJob < ActiveRecord::Migration[6.0]
  def change
    change_column_null :split_pull_request_jobs, :parent_pull_request_id, false
    change_column_null :split_pull_request_jobs, :split_initiated_by_user_id, false
    change_column_null :split_pull_request_jobs, :repo_owner_user_id, false
  end
end
