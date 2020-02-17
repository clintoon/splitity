require 'json'

class SplitityEncryptor
  def initialize(key)
    @key = key
  end

  def encrypt(arg)
    serialized = arg.to_json
    crypt = ActiveSupport::MessageEncryptor.new(@key)
    encrypted_data = crypt.encrypt_and_sign(serialized)
    encrypted_data
  end

  def decrypt(arg)
    crypt = ActiveSupport::MessageEncryptor.new(@key)
    decrypted_data = crypt.decrypt_and_verify(arg)
    unserialized = JSON.parse(decrypted_data)
    unserialized
  end
end