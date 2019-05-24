Rails.application.routes.draw do
  root to: "home#show"
  # root 'sessions#new'

  devise_for :users,
             controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/login', to: 'sessions#new', as: :login
  get '/logout', to: 'sessions#destroy'
end
