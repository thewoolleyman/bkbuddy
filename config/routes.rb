Rails.application.routes.draw do
  root to: "home#show"

  devise_for :users,
             controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get 'sessions/new', as: :new_session
  get '/login', to: 'sessions#new', as: :login
  get '/logout', to: 'sessions#destroy'
end
