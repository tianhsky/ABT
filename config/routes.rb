Rails.application.routes.draw do

  # Auth
  # devise_for :users
  devise_for :users, controllers: { sessions: 'users/sessions' }

  # Iframe to be embedded
  resources :projects, :only => [:show]

  # API (grape)
  mount AppAPI => '/'
end
