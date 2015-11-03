define('frontend/controllers/add', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var AddController;

  AddController = Ember['default'].Controller.extend({
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

  exports['default'] = AddController;

});