class Grifter
  include Mongoid::Document
  include Mongoid::Timestamps
  require 'net/http'
  require 'uri'

  before_save :set_photo

  field :vk_screen_name
  field :photo
  field :vk_id
  field :skype_id
  field :first_name
  field :last_name


  field :description
  field :is_confirmed, type:Boolean, default: false

  belongs_to :user

  def set_photo
    if self.vk_screen_name.present?
      url = "https://api.vkontakte.ru/method/utils.resolveScreenName?screen_name=#{self.vk_screen_name}"
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      response = http.request(Net::HTTP::Get.new(uri.request_uri))
      json = JSON.parse(response.body)["response"]
      self.vk_id = json["object_id"]

      url = "https://api.vkontakte.ru/method/getProfiles?uid=#{self.vk_id}&fields=photo_big"
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      response = http.request(Net::HTTP::Get.new(uri.request_uri))
      json = JSON.parse(response.body)["response"][0]
      self.photo = json["photo_big"]
    else
      self.photo = "http://bakubusinessconsulting.com/ru/wp-content/uploads/2014/11/User-Default.jpg"
    end

  end

  validates_presence_of :first_name, :last_name, :description
end
