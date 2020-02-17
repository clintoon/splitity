require 'test_helper'

class TestEncryptionService < ActiveSupport::TestCase
  test 'has same value when encrypted then decrypted' do
    Rails.application.credentials.stubs(:encryption_key).returns('00000000000000000000000000000000')

    encryption_service = EncryptionService.new

    before_encrypted = 'abc123'
    encrypted_result = encryption_service.encrypt(before_encrypted)
    decrypted_back = encryption_service.decrypt(encrypted_result)

    assert_equal(decrypted_back, before_encrypted)
  end

  test 'encrypts the value' do
    Rails.application.credentials.stubs(:encryption_key).returns('00000000000000000000000000000000')

    encryption_service = EncryptionService.new

    before_encrypted = 'abc123'
    encrypted_result = encryption_service.encrypt(before_encrypted)

    assert_not_equal(encrypted_result, before_encrypted)
  end
end
