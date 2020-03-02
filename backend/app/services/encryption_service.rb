require 'json'

class EncryptionService
  def self.encrypt_and_sign(payload)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.encryption_key, cipher: 'aes-128-cbc')
    serialized = payload.to_json
    encrypted_payload = crypt.encrypt_and_sign(serialized)
    encrypted_payload
  end

  def self.decrypt_and_verify(encrypted_payload)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.encryption_key, cipher: 'aes-128-cbc')
    serialized = crypt.decrypt_and_verify(encrypted_payload)
    payload = JSON.parse(serialized)
    payload
  end
end
