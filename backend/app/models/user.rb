# TODO(clinton): write unit tests
class User < ApplicationRecord
  validates :provider_user_id, uniqueness: true, presence: true
end
