import Ember from 'ember';
import SessionMixin from "../mixins/session";;
var AddRoute;

AddRoute = Ember.Route.extend(SessionMixin, {
  model: function model() {
    return this.store.createRecord('grifter');
  },
  setupController: function setupController(controller, model) {
    return controller.set('model', model);
  }
});

export default AddRoute;