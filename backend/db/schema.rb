# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_03_101824) do

  create_table "child_pull_requests", force: :cascade do |t|
    t.integer "child_pr_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "split_pull_request_job_record_id"
    t.index ["split_pull_request_job_record_id"], name: "index_child_pull_requests_on_split_pull_request_job_record_id"
  end

  create_table "split_pull_request_job_records", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "parent_pr_id", null: false
    t.integer "split_initiated_by_user_id", null: false
    t.integer "status", default: 0, null: false
    t.integer "repo_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider_user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["provider_user_id"], name: "index_users_on_provider_user_id", unique: true
  end

  add_foreign_key "child_pull_requests", "split_pull_request_job_records"
end
