import DS from 'ember-data';
var Grifter;

Grifter = DS.Model.extend({
  vk_screen_name: DS.attr('string'),
  skype_id: DS.attr('string'),
  photo: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  description: DS.attr('string'),
  created_at: DS.attr('string'),
  user: DS.belongsTo('user', {
    async: true
  }),
  short_description: (function() {
    if (this.get('description').length > 50) {
      return this.get('description').substr(0, 50) + '...';
    } else {
      return this.get('description');
    }
  }).property('description'),
  formatted_created_at: (function() {
    var date, format;
    date = this.get('created_at');
    format = "Do MMM YY";
    return moment(date).locale('ru').format(format);
  }).property('created_at')
});

export default Grifter;
