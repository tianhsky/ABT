module APICustomers
  class ApplicationAPI < Grape::API
    prefix 'customer-api'
    format :json

    mount V1::ProjectsAPI

  end
end
