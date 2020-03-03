Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'v1/auth/login', to: 'auth#login'

  get 'v1/current_user', to: 'current_user#user_info'
  get 'v1/current_user/github_app_installations', to: 'current_user#github_app_installations'

  post 'v1/repos/:owner/:repo_name/pulls/:pull_request_id/split', to: 'pull_requests#split'
  get 'v1/repos/:owner/:repo_name/pulls/:pull_request_id/diff', to: 'pull_requests#get_diff'

  post 'v1/hooks/github', to: 'github_events#notify'
end
