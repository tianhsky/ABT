require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ABT
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # load libs
    config.paths.add File.join('app', 'api'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'api', '*')]

    # CORS
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: :any, credentials: false
      end
    end

    # Scaffold
    config.generators do |g|
      g.helper false
      g.assets false

      g.orm             :mongoid
      g.template_engine :slim
      g.test_framework  :rspec, :fixture => false
      g.view_specs      false
      g.helper_specs    false
      g.fixture_replacement :fabrication
    end
  end
end
