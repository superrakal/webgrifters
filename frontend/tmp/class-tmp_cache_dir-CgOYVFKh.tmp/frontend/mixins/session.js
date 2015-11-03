define('frontend/mixins/session', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var SessionMixin;

  SessionMixin = Ember['default'].Mixin.create({
    before_model: function before_model() {
      if (!this.session.get('isLoggedIn')) {
        this.transitionTo('root');
        return Ember['default'].run.later(function () {
          return window.App.reset();
        }, 100);
      }
    }
  });

  exports['default'] = SessionMixin;

});