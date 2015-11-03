module Api
  module V1
    class UsersController < ApplicationController

      respond_to :json

      def show
        @user = User.find params[:id]
        respond_with @user
      end
    end
  end
end
