require 'rails_helper'

RSpec.describe Api::V1::UsersController, :type => :controller do

  describe "GET index" do
    it "returns http success" do
      get :index
      expect(response).to be_success
    end
  end

  describe "GET show" do
    it "returns http success" do
      get :show
      expect(response).to be_success
    end
  end

  describe "GET auth_by_vk" do
    it "returns http success" do
      get :auth_by_vk
      expect(response).to be_success
    end
  end

  describe "GET vk_auth_callback" do
    it "returns http success" do
      get :vk_auth_callback
      expect(response).to be_success
    end
  end

end
