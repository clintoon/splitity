require 'test_helper'
require 'securerandom'

class TestEncryptionService < ActiveSupport::TestCase
  test 'has same value when encrypted then decrypted' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    encryption_service = EncryptionService.new

    before_encrypted = 'abc123'
    encrypted_result = encryption_service.encrypt(before_encrypted)
    decrypted_back = encryption_service.decrypt(encrypted_result)

    assert_equal(decrypted_back, before_encrypted)
  end

  test 'encrypts the value' do
    key = SecureRandom.random_bytes(16)
    Rails.application.credentials.stubs(:encryption_key).returns(key)

    encryption_service = EncryptionService.new

    before_encrypted = 'abc123'
    encrypted_result = encryption_service.encrypt(before_encrypted)

    assert_not_equal(encrypted_result, before_encrypted)
  end
end
