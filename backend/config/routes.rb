Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'v1/repos/:owner/:repo_name/pulls/:pull_request_id/split', to: 'pull_requests#split'
  post 'v1/hooks/github', to: 'github_events#notify'
end
