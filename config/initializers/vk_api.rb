VkontakteApi.configure do |config|
  # параметры, необходимые для авторизации средствами vkontakte_api
  # (не нужны при использовании сторонней авторизации)
  if Rails.env.development?
    config.app_id       = '4081089'
    config.app_secret   = '8aPvPYjnYo8keIbEZYnm'
    config.redirect_uri = 'http://local.vcap.me:3000/welcome/vk_auth_callback'
  else
    config.app_id       = '4362383'
    config.app_secret   = 'x4uzxW9Oqn0gDgDRp3Lt'
    config.redirect_uri = 'http://webgrifters.ru/welcome/vk_auth_callback'
  end


  # faraday-адаптер для сетевых запросов
  config.adapter = :net_http
  # HTTP-метод для вызова методов API (:get или :post)
  config.http_verb = :post
  # параметры для faraday-соединения
  config.faraday_options = {
      ssl: {
          ca_path:  '/usr/lib/ssl/certs'
      },
      proxy: {
          uri:      'http://proxy.example.com',
          user:     'foo',
          password: 'bar'
      }
  }
  # максимальное количество повторов запроса при ошибках
  config.max_retries = 2

  # логгер
  config.logger        = Rails.logger
  config.log_requests  = true  # URL-ы запросов
  config.log_errors    = true  # ошибки
  config.log_responses = false # удачные ответы

  # используемая версия API
  config.api_version = '5.21'
end