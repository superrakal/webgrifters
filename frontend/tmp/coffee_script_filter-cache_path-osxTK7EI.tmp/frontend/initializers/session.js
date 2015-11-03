import Session from "simple-auth/session";
var CurrentUserInitializer, initialize;

initialize = function(container, application) {
  window.App = application;
  return Session.reopen({
    isLoggedIn: (function() {
      var id;
      id = null;
      Ember.$.ajax({
        type: 'GET',
        url: "/welcome/current_user_id",
        async: false,
        success: (function(_this) {
          return function(data) {
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

export {initialize};

export default CurrentUserInitializer;
