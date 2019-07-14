Rails.application.routes.draw do

  # Iframe to be embedded
  resources :projects, :only => [:show]

  # Client API (rails)
  scope module: 'customer_api' do
    resources :clients
    resources :projects
  end

  # Visitor API (grape)
  mount API => '/'
end
