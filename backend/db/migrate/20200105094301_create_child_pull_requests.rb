class CreateChildPullRequests < ActiveRecord::Migration[6.0]
  def change
    rename_column :split_pull_request_jobs, :splitted_pr_id, :parent_pr_id

    create_table :child_pull_requests do |t|
      t.belongs_to :split_pull_request_jobs
      t.integer :child_pr_id, null: false
      t.timestamps
    end
  end
end
