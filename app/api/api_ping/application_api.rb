module APIPing
  class ApplicationAPI < Grape::API
    prefix 'api'
    format :json

    get '/ping' do
      {}
    end

  end
end