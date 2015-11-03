import Ember from 'ember';
import config from './config/environment';
var Router;

Router = Ember.Router.extend();

Router.map(function() {
  this.route('root', {
    path: '/'
  });
  return this.route('add');
});

export default Router;
