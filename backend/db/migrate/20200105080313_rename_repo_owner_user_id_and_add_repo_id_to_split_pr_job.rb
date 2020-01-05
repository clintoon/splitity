class RenameRepoOwnerUserIdAndAddRepoIdToSplitPrJob < ActiveRecord::Migration[6.0]
  def change
    rename_column :split_pull_request_jobs, :parent_pull_request_id, :splitted_pr_id
    remove_column :split_pull_request_jobs, :repo_owner_user_id
    add_column :split_pull_request_jobs, :repo_id, :string
  end
end
