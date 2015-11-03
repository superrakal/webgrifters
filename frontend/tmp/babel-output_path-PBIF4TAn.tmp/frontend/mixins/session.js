import Ember from 'ember';
var SessionMixin;

SessionMixin = Ember.Mixin.create({
  before_model: function before_model() {
    if (!this.session.get('isLoggedIn')) {
      this.transitionTo('root');
      return Ember.run.later(function () {
        return window.App.reset();
      }, 100);
    }
  }
});

export default SessionMixin;