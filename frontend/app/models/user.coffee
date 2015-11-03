`import DS from 'ember-data'`

User = DS.Model.extend
  vk_screen_name: DS.attr 'string'
  vk_photo:       DS.attr 'string'
  first_name:     DS.attr 'string'
  last_name:      DS.attr 'string'
  description:    DS.attr 'string'

`export default User`
