module V1
  class EventsAPI < Grape::API
    version 'v1'
    helpers APIHelpers::ParamsHelper
    helpers APIHelpers::SessionHelper
    helpers APIHelpers::EventLogHelper
    
    namespace :events do      
      post '/' do
        save_event_log
        present {}
      end
    end

  end
end