define('frontend/initializers/session', ['exports', 'simple-auth/session'], function (exports, Session) {

  'use strict';

  var CurrentUserInitializer, initialize;

  initialize = function (container, application) {
    window.App = application;
    return Session['default'].reopen({
      isLoggedIn: (function () {
        var id;
        id = null;
        Ember.$.ajax({
          type: 'GET',
          url: "/welcome/current_user_id",
          async: false,
          success: (function (_this) {
            return function (data) {
              return id = data.current_user_id;
            };
          })(this)
        });
        if (id === null) {
          return false;
        } else {
          return true;
        }
      }).property()
    });
  };

  CurrentUserInitializer = {
    name: 'currentUser',
    before: 'simple-auth',
    initialize: initialize
  };

  exports['default'] = CurrentUserInitializer;

  exports.initialize = initialize;

});