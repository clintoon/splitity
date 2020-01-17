unless ENV['RAILS_ENV'] == 'test'
  REDIS_URL = Rails.application.credentials.redis[:uri]

  Sidekiq.configure_server do |config|
    config.redis = { url: REDIS_URI }
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: REDIS_URI }
  end
end
