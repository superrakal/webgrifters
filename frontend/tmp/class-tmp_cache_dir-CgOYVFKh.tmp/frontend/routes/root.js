define('frontend/routes/root', ['exports', 'ember', 'ember-infinity/mixins/route'], function (exports, Ember, InfinityRoute) {

  'use strict';

  var RootRoute;

  RootRoute = Ember['default'].Route.extend(InfinityRoute['default'], {
    model: function model() {
      return this.infinityModel("grifter", {
        perPage: 3,
        startingPage: 1
      });
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = RootRoute;

});