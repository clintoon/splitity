# Controller to split pull requests
class PullRequestsController < ApplicationController
  before_action :login_required

  def split
    render json: { splitPullRequestJobId: 'abc123' }
  end
end
