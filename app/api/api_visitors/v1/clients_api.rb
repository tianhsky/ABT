module APIVisitors
  module V1
    class ClientsAPI < Grape::API
      version 'v1'
      content_type :javascript, 'application/javascript'
      helpers APIHelpers::PclientHelper

      namespace :clients do
        get '/:pclient_id.js' do
          content_type 'application/javascript'        
          pclient_js
        end
      end
      
    end
  end
end