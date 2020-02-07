module APIHelpers
  module AuthHelper

    extend Grape::API::Helpers

    def current_user
      warden = env["warden"]
      @current_user ||= warden.authenticate
    end
  end
end