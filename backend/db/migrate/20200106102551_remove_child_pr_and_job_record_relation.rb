class RemoveChildPrAndJobRecordRelation < ActiveRecord::Migration[6.0]
  def change
    remove_column :child_pull_requests, :split_pull_request_job_id
  end
end
