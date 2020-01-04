ENV['RAILS_ENV'] ||= 'test'

if ENV['CI'] == 'true'
  require 'simplecov'
  SimpleCov.start 'rails'
end

require_relative '../config/environment'
require 'rails/test_help'
require 'minitest/autorun'

class ActiveSupport::TestCase
  if ENV['CI'] == 'true'
    # TODO(clinton): Get rid of this once simplecov fix parallelization
    parallelize(workers: 1)
  else
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)
  end

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
