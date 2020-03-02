require 'jwe'

class JweService
  def self.encrypt(value)
    JWE.encrypt(value, Rails.application.credentials.encryption_key, alg: 'dir')
  end

  def self.decrypt(value)
    JWE.decrypt(value, Rails.application.credentials.encryption_key)
  end
end
