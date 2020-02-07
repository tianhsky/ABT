module APICustomers
  module V1
    class PclientsAPI < Grape::API
      version 'v1'

      helpers APIHelpers::PclientHelper
      
      namespace :pclients do
        get '/:pclient_id/projects' do
          pclient
          present PclientSimpleProjectsSerializer.new(@pclient).as_json
        end
      end

    end
  end
end