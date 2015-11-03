import Ember from 'ember';
import SessionMixin from "../mixins/session";;
var AddRoute;

AddRoute = Ember.Route.extend(SessionMixin, {
  model: function() {
    return this.store.createRecord('grifter');
  },
  setupController: function(controller, model) {
    return controller.set('model', model);
  }
});

export default AddRoute;
