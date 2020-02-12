if !Rails.application.credentials.redis.nil?
  REDIS_URI = Rails.application.credentials.redis[:uri]
  REDIS_PASSWORD = Rails.application.credentials.redis[:password]

  Sidekiq.configure_server do |config|
    config.redis = { url: REDIS_URI, password: REDIS_PASSWORD }
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: REDIS_URI, password: REDIS_PASSWORD }
  end

else
  Rails.logger.warn('Unable to find redis url in credentials. Using defaults')
end
