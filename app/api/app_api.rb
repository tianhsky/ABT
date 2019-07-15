class AppAPI < Grape::API
  format :json

  helpers APIHelpers::ParamsHelper
  
  mount APIVisitors::ApplicationAPI
  mount APICustomers::ApplicationAPI

  rescue_from Grape::Exceptions::ValidationErrors do |e|
    rack_response({
      status: e.status,
      error_msg: e.message,
    }.to_json, 400)
  end
end
