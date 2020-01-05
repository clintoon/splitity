class RemoveBelongsToRelationChildPr < ActiveRecord::Migration[6.0]
  def change
    remove_column :child_pull_requests, :split_pull_request_jobs_id
  end
end
