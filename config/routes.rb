Rails.application.routes.draw do

  namespace 'api' do
    resources :boards, defaults: {format: :json} do
      resources :columns, except: [:show], defaults: {format: :json}
      resources :tasks, except: [:show, :index], defaults: {format: :json}
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
