LunaToDo::Application.routes.draw do

  get '/open', to: 'luna/sessions#new', as: 'open_session'

  # Lists
  resources :lists

end

