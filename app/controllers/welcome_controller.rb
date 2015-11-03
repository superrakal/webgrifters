class WelcomeController < ApplicationController
  def index
  end

  def auth_by_vk
    session[:state] = Digest::MD5.hexdigest(rand.to_s)
    redirect_to VkontakteApi.authorization_url(scope: [:notify, :email, :first_name, :last_name], state: session[:state])
  end

  def vk_auth_callback
    if params[:error] == 'access_denied'
      redirect_to root_path
    else
      @vk = VkontakteApi.authorize(code: params[:code])
      @user = User.find_for_vkontakte_oauth @vk
      sign_in @user
      redirect_to root_path
    end
  end

  def current_user_id
    render json: {:current_user_id => current_user.present? ? current_user.id: nil}
  end
end
