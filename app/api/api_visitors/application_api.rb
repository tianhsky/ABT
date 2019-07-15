module APIVisitors
  class ApplicationAPI < Grape::API
    prefix 'api'
    format :json

    mount V1::ClientsAPI
    mount V1::EventsAPI

  end
end
