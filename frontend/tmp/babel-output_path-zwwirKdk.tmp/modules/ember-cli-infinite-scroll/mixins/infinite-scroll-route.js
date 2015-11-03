import Ember from 'ember';
import InfiniteScrollMixin from 'ember-cli-infinite-scroll/mixins/infinite-scroll';

var Mixin = Ember.Mixin;
var computed = Ember.computed;
var on = Ember.on;

/**
 A mixin for routes that need infinite scrolling.

 @class InfiniteScrollRouteMixin
 @uses InfiniteScrollMixin
 */

export default Mixin.create(InfiniteScrollMixin, {

  /**
   Sets defaults for `infiniteScrollAvailable` and `hasMoreContent`
    @method beforeModel
   */

  beforeModel: function beforeModel() {
    this.set('infiniteScrollAvailable', true);
    this.set('hasMoreContent', true);
  },

  /**
   Delegates a given property to the related controller (or specified controller
   if `controllerName` is defined. This is useful so that properties are
   available to use on the controller.
    @param property { String } the property to get or set
   @param value the value of the propery to set
   */

  coerceControllerAlias: function coerceControllerAlias(property, value) {
    var controllerName = this.get('controllerName') || this.get('routeName');
    var controller = this.get('controller') || this.controllerFor(controllerName);
    if ('undefined' !== typeof value) {
      controller.set(property, value);
      return value;
    } else {
      return controller.get(property);
    }
  },

  /**
   True if the infinite scroll can be used.
    @property infiniteScrollAvailable
   @type { Boolean }
   */

  infiniteScrollAvailable: computed(function (key, value) {
    return this.coerceControllerAlias('infiniteScrollAvailable', value);
  }),

  /**
   True if it should continue making calls for new content.
    @property hasMoreContent
   @type { Boolean }
   */

  hasMoreContent: computed(function (key, value) {
    return this.coerceControllerAlias('hasMoreContent', value);
  }),

  /**
   True if a query has been started but not finished.
    @property infiniteQuerying
   @type { Boolean }
   */

  infiniteQuerying: computed(function (key, value) {
    return this.coerceControllerAlias('infiniteQuerying', value);
  }),

  /**
   The name of the model that the infinite content will be added to.
    @property infiniteContentPropertyName
   @type { String }
   @default 'controller.model'
   */

  infiniteContentPropertyName: 'controller.model',

  /**
   Resets the property defined by `infiniteIncrementProperty` on
   `willTransition`.
    @method _resetProperties
   @private
   */

  _resetProperties: on('willTransition', function () {
    var infiniteIncrementProperty = this.get('infiniteIncrementProperty');
    this.set(infiniteIncrementProperty, 0);
  })
});