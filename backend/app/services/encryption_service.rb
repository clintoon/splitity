class EncryptionService
  def initialize
    key = Rails.application.credentials.encryption_key
    @encryptor = SplitityEncryptor.new(key)
  end

  def encrypt(arg)
    @encryptor.encrypt(arg)
  end

  def decrypt(arg)
    @encryptor.decrypt(arg)
  end
end
