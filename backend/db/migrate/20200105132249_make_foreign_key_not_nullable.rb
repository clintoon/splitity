class MakeForeignKeyNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :child_pull_requests, :split_pull_request_job_id, false
  end
end
