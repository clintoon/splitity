require 'json'

class EncryptionService
  def self.encrypt_and_sign(payload, **options)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.encryption_key, cipher: 'aes-128-cbc', serializer: JSON)
    encrypted_payload = crypt.encrypt_and_sign(payload, **options)
    encrypted_payload
  end

  def self.decrypt_and_verify(encrypted_payload)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.encryption_key, cipher: 'aes-128-cbc', serializer: JSON)
    payload = crypt.decrypt_and_verify(encrypted_payload)
    payload
  end
end
