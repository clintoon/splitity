class AddSplitPullRequestJobColumns < ActiveRecord::Migration[6.0]
  def change
    change_table :split_pull_request_jobs do |t|
      t.integer :parent_pull_request_id
      t.integer :split_initiated_by_user_id
      t.integer :repo_owner_user_id
    end
  end
end
