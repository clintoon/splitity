class MakeUserIdUniqueUsers < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :provider_user_id, unique: true
  end
end
