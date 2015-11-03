import { moduleForModel, test } from 'ember-qunit';
moduleForModel('grifter', 'Unit | Model | grifter', {
  needs: []
});

test('it exists', function (assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});