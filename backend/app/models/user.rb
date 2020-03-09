class User < ApplicationRecord
  validates :provider_user_id, uniqueness: true, presence: true
end
