define('frontend/models/grifter', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Grifter;

  Grifter = DS['default'].Model.extend({
    vk_screen_name: DS['default'].attr('string'),
    skype_id: DS['default'].attr('string'),
    photo: DS['default'].attr('string'),
    first_name: DS['default'].attr('string'),
    last_name: DS['default'].attr('string'),
    description: DS['default'].attr('string'),
    created_at: DS['default'].attr('string'),
    user: DS['default'].belongsTo('user', {
      async: true
    }),
    short_description: (function () {
      if (this.get('description').length > 50) {
        return this.get('description').substr(0, 50) + '...';
      } else {
        return this.get('description');
      }
    }).property('description'),
    formatted_created_at: (function () {
      var date, format;
      date = this.get('created_at');
      format = "Do MMM YY";
      return moment(date).locale('ru').format(format);
    }).property('created_at')
  });

  exports['default'] = Grifter;

});