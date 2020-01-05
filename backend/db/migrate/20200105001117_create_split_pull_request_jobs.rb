class CreateSplitPullRequestJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :split_pull_request_jobs do |t|

      t.timestamps
    end
  end
end
