Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users,    only: [:show]
      resources :grifters, only: [:index, :show, :create]
    end
  end
  devise_for :users
  get 'welcome/vk_auth_callback'
  get 'welcome/auth_by_vk'
  get 'welcome/current_user_id'
  root 'welcome#index'
end
