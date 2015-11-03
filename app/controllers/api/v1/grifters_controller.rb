module Api
  module V1
    class GriftersController < ApplicationController

      before_action :authenticate_user!, only: [:create]

      respond_to :json

      def index
        if params[:search].present?
          searching_scope = params[:search].mb_chars.downcase.to_s
          @grifters = Grifter.where(is_confirmed: true).order_by(created_at: 'desc').any_of({search_vk_screen_name: searching_scope},
                                                          {search_first_name: searching_scope}, {search_last_name: searching_scope})
        else
          @grifters = Grifter.where(is_confirmed: true).order_by(created_at: 'desc')
        end
        @grifters = @grifters.page(params[:page]).per(params[:per_page])
        respond_with @grifters, meta: {total_pages: @grifters.total_pages}
      end

      def show
        @grifter = Grifter.find params[:id]
        respond_with @grifter
      end

      def create
        @grifter = Grifter.new grifter_params
        @grifter.user = current_user
        if @grifter.save
          respond_with @grifter, status: :created, location: false
        else
          respond_with @grifter, status: :unprocessable_entity
        end
      end

      private
        def grifter_params
          params.require(:grifter).permit :vk_screen_name, :skype_id, :first_name, :last_name, :description
        end
    end
  end
end
