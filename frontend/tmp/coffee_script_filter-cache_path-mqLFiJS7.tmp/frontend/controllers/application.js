import Ember from 'ember';
var ApplicationController;

ApplicationController = Ember.Controller.extend({
  actions: {
    sign_out: function() {
      return Ember.$.ajax({
        type: 'DELETE',
        url: "/users/sign_out",
        async: false,
        success: (function(_this) {
          return function() {
            return location.reload();
          };
        })(this)
      });
    }
  }
});

export default ApplicationController;
