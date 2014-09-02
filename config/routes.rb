LunaToDo::Application.routes.draw do

  get '/open', to: 'luna/sessions#new', as: 'open_session'
  post '/open', to: 'luna/sessions#create'

  # Lists
  resources :lists

  # Api
  namespace :api do
    namespace :v1 do
      resources :list, only: ['create', 'update']
    end
  end

end

