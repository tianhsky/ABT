module APICustomers
  module V1
    class ProjectsAPI < Grape::API
      version 'v1'

      helpers APIHelpers::ProjectHelper
      
      namespace :projects do      
        get '/:project_id' do
          get_project
          present ProjectSerializer.new(@project).as_json
        end

        post '/' do
          save_project
          present ProjectSerializer.new(@project).as_json
        end
      end

    end
  end
end