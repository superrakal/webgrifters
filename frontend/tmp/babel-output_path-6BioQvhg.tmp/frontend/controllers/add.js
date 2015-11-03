import Ember from 'ember';
var AddController;

AddController = Ember.Controller.extend({
  isAdded: false,
  actions: {
    add: function add() {
      return this.model.save().then((function (_this) {
        return function () {
          return _this.set('isAdded', true);
        };
      })(this));
    }
  }
});

export default AddController;