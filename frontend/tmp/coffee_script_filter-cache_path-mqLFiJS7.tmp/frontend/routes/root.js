import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";;
var RootRoute;

RootRoute = Ember.Route.extend(InfinityRoute, {
  model: function() {
    return this.infinityModel("grifter", {
      perPage: 3,
      startingPage: 1
    });
  },
  setupController: function(controller, model) {
    return controller.set('model', model);
  }
});

export default RootRoute;
