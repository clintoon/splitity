require 'mixpanel-ruby'

class TrackerService
  def initialize(user_id)
    project_token = Rails.application.credentials.mixpanel[:token]
    @tracker = Mixpanel::Tracker.new(project_token)
    @user_id = user_id
  end

  def track(event_name, additional_properties)
    @tracker.track(@user_id, event_name, additional_properties)
  end
end
