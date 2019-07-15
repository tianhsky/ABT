Rails.application.routes.draw do

  # Iframe to be embedded
  resources :projects, :only => [:show]

  # API (grape)
  mount AppAPI => '/'
end
