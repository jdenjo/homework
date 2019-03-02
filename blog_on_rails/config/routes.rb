Rails.application.routes.draw do

  resources :posts do
    resources :comments, only: [:create, :destroy]
  end

  resources :users, only: [ :new, :create, :update, :edit ]
  
 resource :session, only: [ :new, :create ] do
    delete :destroy, on: :collection
  end
 
  get '/', to: "posts#welcome", as: :root

  get '/users/:id/password', to: "users#password"

  post '/users/:id/password', to: "users#password_post", as: "password_post"

end
