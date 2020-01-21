if !Rails.application.credentials.redis.nil?
  REDIS_URI = Rails.application.credentials.redis[:uri]

  Sidekiq.configure_server do |config|
    config.redis = { url: REDIS_URI }
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: REDIS_URI }
  end

else
  Rails.logger.warn('Unable to find redis url in credentials. Using defaults')
end
