LunaToDo::Application.routes.draw do

  # Luna
  get '/open', to: 'luna/sessions#new', as: 'open_session'
  post '/open', to: 'luna/sessions#create'
  delete '/open', to: 'luna/sessions#destroy'

  # Lists
  resources :lists

  # Api
  namespace :api do
    namespace :v1 do
      resources :lists, only: ['create', 'update']
    end
  end

  root to: 'lists#index'

end

