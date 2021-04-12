Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tables
    end
  end
  post 'authenticate', to: 'authentication#authenticate'
  get 'authenticate', to: 'authentication#authenticate'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
