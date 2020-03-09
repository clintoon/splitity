require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'invalid when provider_user_id is nil' do
    user = build(:user)
    user.provider_user_id = nil

    assert user.invalid?
  end

  test 'invalid when provider_user_id is not unique' do
    User.create(provider_user_id: 1)
    user = build(:user)
    user.provider_user_id = 1

    assert user.invalid?
  end

  test 'valid when provider_user_id is unique' do
    user = build(:user)
    user.provider_user_id = 1

    assert user.valid?
  end
end
