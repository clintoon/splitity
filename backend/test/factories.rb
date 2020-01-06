FactoryBot.define do
  factory :split_pull_request_job_record do
    parent_pr_id { 1 }
    split_initiated_by_user_id { 1 }
    repo_id { 'repo123' }
  end

  factory :child_pull_request do
    child_pr_id { 1 }
    split_pull_request_job_record
  end
end
