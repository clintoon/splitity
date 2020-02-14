Raven.configure do |config|
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  config.sanitize_http_headers = %w[Authorization Access-Token]
end
