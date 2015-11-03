class GrifterSerializer < ActiveModel::Serializer
  attributes :id, :vk_screen_name, :skype_id, :first_name, :last_name, :description, :user_id, :photo, :created_at
end
