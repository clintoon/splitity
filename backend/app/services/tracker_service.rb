require 'mixpanel-ruby'

class TrackingService
  def initialize(user_id)
    @tracker = Mixpanel::Tracker.new(PROJECT_TOKEN)
    @user_id = user_id
  end

  def track(event_name, additional_properties)
    @tracker.track(@user_id, event_name, additional_properties)
  end
end
