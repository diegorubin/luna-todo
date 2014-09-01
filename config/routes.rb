LunaToDo::Application.routes.draw do

  get '/open', to: 'luna/sessions#new', as: 'open_session'
  post '/open', to: 'luna/sessions#create'

  # Lists
  resources :lists

end

