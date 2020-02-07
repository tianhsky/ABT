class AppAPI < Grape::API
  format :json

  helpers APIHelpers::ParamsHelper

  before do
    header "Access-Control-Allow-Origin", "*"
    header "Access-Control-Request-Method", "*"
    header "Access-Control-Allow-Headers", "*"
    header "Access-Control-Expose-Headers", "*"
    header "Access-Control-Allow-Credentials", "true"
  end

  mount APIPing::ApplicationAPI  
  mount APIVisitors::ApplicationAPI
  mount APICustomers::ApplicationAPI

  rescue_from Grape::Exceptions::ValidationErrors do |e|
    rack_response({
      status: e.status,
      error_msg: e.message,
    }.to_json, 400)
  end
end
