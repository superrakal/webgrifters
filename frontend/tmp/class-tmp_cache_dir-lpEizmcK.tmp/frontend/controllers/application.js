define('frontend/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationController;

  ApplicationController = Ember['default'].Controller.extend({
    actions: {
      sign_out: function sign_out() {
        return Ember['default'].$.ajax({
          type: 'DELETE',
          url: "/users/sign_out",
          async: false,
          success: (function (_this) {
            return function () {
              return location.reload();
            };
          })(this)
        });
      }
    }
  });

  exports['default'] = ApplicationController;

});