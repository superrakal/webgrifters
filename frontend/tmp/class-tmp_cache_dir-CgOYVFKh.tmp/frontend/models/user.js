define('frontend/models/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var User;

  User = DS['default'].Model.extend({
    vk_screen_name: DS['default'].attr('string'),
    vk_photo: DS['default'].attr('string'),
    first_name: DS['default'].attr('string'),
    last_name: DS['default'].attr('string'),
    description: DS['default'].attr('string')
  });

  exports['default'] = User;

});