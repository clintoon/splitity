class AddBelongsToCorrectlyChildPr < ActiveRecord::Migration[6.0]
  def change
    add_reference :child_pull_requests, :split_pull_request_job, foreign_key: true
  end
end
