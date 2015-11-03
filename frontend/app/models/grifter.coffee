`import DS from 'ember-data'`

Grifter = DS.Model.extend
  vk_screen_name: DS.attr 'string'
  skype_id:       DS.attr 'string'
  photo:          DS.attr 'string'
  first_name:     DS.attr 'string'
  last_name:      DS.attr 'string'
  description:    DS.attr 'string'
  created_at:     DS.attr 'string'

  user:        DS.belongsTo 'user', async: true

  short_description: (->
    if @get('description').length > 100
      @get('description').substr(0, 100)+'...'
    else
      @get('description')
  ).property('description')

  formatted_created_at: (->
    date = @get 'created_at'
    format = "Do MMMM YYYY"
    moment(date).locale('ru').format format
  ).property('created_at')



`export default Grifter`
