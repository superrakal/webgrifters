define('frontend/routes/add', ['exports', 'ember', 'frontend/mixins/session'], function (exports, Ember, SessionMixin) {

  'use strict';

  var AddRoute;

  AddRoute = Ember['default'].Route.extend(SessionMixin['default'], {
    model: function model() {
      return this.store.createRecord('grifter');
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = AddRoute;

});