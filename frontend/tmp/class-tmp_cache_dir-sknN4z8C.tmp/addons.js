define('active-model-adapter', ['active-model-adapter/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('active-model-adapter/active-model-adapter', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  var InvalidError = DS['default'].InvalidError;
  var errorsHashToArray = DS['default'].errorsHashToArray;
  var RESTAdapter = DS['default'].RESTAdapter;
  var _Ember$String = Ember['default'].String;
  var pluralize = _Ember$String.pluralize;
  var decamelize = _Ember$String.decamelize;
  var underscore = _Ember$String.underscore;

  /**
    @module ember-data
  */

  /**
    The ActiveModelAdapter is a subclass of the RESTAdapter designed to integrate
    with a JSON API that uses an underscored naming convention instead of camelCasing.
    It has been designed to work out of the box with the
    [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
    Ruby gem. This Adapter expects specific settings using ActiveModel::Serializers,
    `embed :ids, embed_in_root: true` which sideloads the records.

    This adapter extends the DS.RESTAdapter by making consistent use of the camelization,
    decamelization and pluralization methods to normalize the serialized JSON into a
    format that is compatible with a conventional Rails backend and Ember Data.

    ## JSON Structure

    The ActiveModelAdapter expects the JSON returned from your server to follow
    the REST adapter conventions substituting underscored keys for camelcased ones.

    Unlike the DS.RESTAdapter, async relationship keys must be the singular form
    of the relationship name, followed by "_id" for DS.belongsTo relationships,
    or "_ids" for DS.hasMany relationships.

    ### Conventional Names

    Attribute names in your JSON payload should be the underscored versions of
    the attributes in your Ember.js models.

    For example, if you have a `Person` model:

    ```js
    App.FamousPerson = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```

    The JSON returned should look like this:

    ```js
    {
      "famous_person": {
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation": "President"
      }
    }
    ```

    Let's imagine that `Occupation` is just another model:

    ```js
    App.Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.belongsTo('occupation')
    });

    App.Occupation = DS.Model.extend({
      name: DS.attr('string'),
      salary: DS.attr('number'),
      people: DS.hasMany('person')
    });
    ```

    The JSON needed to avoid extra server calls, should look like this:

    ```js
    {
      "people": [{
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation_id": 1
      }],

      "occupations": [{
        "id": 1,
        "name": "President",
        "salary": 100000,
        "person_ids": [1]
      }]
    }
    ```

    @class ActiveModelAdapter
    @constructor
    @namespace DS
    @extends DS.RESTAdapter
  **/

  var ActiveModelAdapter = RESTAdapter.extend({
    defaultSerializer: '-active-model',
    /**
      The ActiveModelAdapter overrides the `pathForType` method to build
      underscored URLs by decamelizing and pluralizing the object type name.
       ```js
        this.pathForType("famousPerson");
        //=> "famous_people"
      ```
       @method pathForType
      @param {String} modelName
      @return String
    */
    pathForType: function pathForType(modelName) {
      var decamelized = decamelize(modelName);
      var underscored = underscore(decamelized);
      return pluralize(underscored);
    },

    /**
      The ActiveModelAdapter overrides the `handleResponse` method
      to format errors passed to a DS.InvalidError for all
      422 Unprocessable Entity responses.
       A 422 HTTP response from the server generally implies that the request
      was well formed but the API was unable to process it because the
      content was not semantically correct or meaningful per the API.
       For more information on 422 HTTP Error code see 11.2 WebDAV RFC 4918
      https://tools.ietf.org/html/rfc4918#section-11.2
       @method ajaxError
      @param {Object} jqXHR
      @return error
    */
    handleResponse: function handleResponse(status, headers, payload) {
      if (this.isInvalid(status, headers, payload)) {
        var errors = errorsHashToArray(payload.errors);

        return new InvalidError(errors);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

  exports['default'] = ActiveModelAdapter;

});
define('active-model-adapter/active-model-serializer', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  var _Ember$String = Ember['default'].String;
  var singularize = _Ember$String.singularize;
  var classify = _Ember$String.classify;
  var decamelize = _Ember$String.decamelize;
  var camelize = _Ember$String.camelize;
  var underscore = _Ember$String.underscore;
  var RESTSerializer = DS['default'].RESTSerializer;
  var normalizeModelName = DS['default'].normalizeModelName;

  /**
    The ActiveModelSerializer is a subclass of the RESTSerializer designed to integrate
    with a JSON API that uses an underscored naming convention instead of camelCasing.
    It has been designed to work out of the box with the
    [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
    Ruby gem. This Serializer expects specific settings using ActiveModel::Serializers,
    `embed :ids, embed_in_root: true` which sideloads the records.

    This serializer extends the DS.RESTSerializer by making consistent
    use of the camelization, decamelization and pluralization methods to
    normalize the serialized JSON into a format that is compatible with
    a conventional Rails backend and Ember Data.

    ## JSON Structure

    The ActiveModelSerializer expects the JSON returned from your server
    to follow the REST adapter conventions substituting underscored keys
    for camelcased ones.

    ### Conventional Names

    Attribute names in your JSON payload should be the underscored versions of
    the attributes in your Ember.js models.

    For example, if you have a `Person` model:

    ```js
    App.FamousPerson = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```

    The JSON returned should look like this:

    ```js
    {
      "famous_person": {
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation": "President"
      }
    }
    ```

    Let's imagine that `Occupation` is just another model:

    ```js
    App.Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.belongsTo('occupation')
    });

    App.Occupation = DS.Model.extend({
      name: DS.attr('string'),
      salary: DS.attr('number'),
      people: DS.hasMany('person')
    });
    ```

    The JSON needed to avoid extra server calls, should look like this:

    ```js
    {
      "people": [{
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation_id": 1
      }],

      "occupations": [{
        "id": 1,
        "name": "President",
        "salary": 100000,
        "person_ids": [1]
      }]
    }
    ```

    @class ActiveModelSerializer
    @namespace DS
    @extends DS.RESTSerializer
  */
  var ActiveModelSerializer = RESTSerializer.extend({
    // SERIALIZE

    /**
      Converts camelCased attributes to underscored when serializing.
       @method keyForAttribute
      @param {String} attribute
      @return String
    */
    keyForAttribute: function keyForAttribute(attr) {
      return decamelize(attr);
    },

    /**
      Underscores relationship names and appends "_id" or "_ids" when serializing
      relationship keys.
       @method keyForRelationship
      @param {String} relationshipModelName
      @param {String} kind
      @return String
    */
    keyForRelationship: function keyForRelationship(relationshipModelName, kind) {
      var key = decamelize(relationshipModelName);
      if (kind === "belongsTo") {
        return key + "_id";
      } else if (kind === "hasMany") {
        return singularize(key) + "_ids";
      } else {
        return key;
      }
    },

    /**
     `keyForLink` can be used to define a custom key when deserializing link
     properties. The `ActiveModelSerializer` camelizes link keys by default.
      @method keyForLink
     @param {String} key
     @param {String} kind `belongsTo` or `hasMany`
     @return {String} normalized key
    */
    keyForLink: function keyForLink(key, relationshipKind) {
      return camelize(key);
    },

    /*
      Does not serialize hasMany relationships by default.
    */
    serializeHasMany: function serializeHasMany() {},

    /**
     Underscores the JSON root keys when serializing.
       @method payloadKeyFromModelName
      @param {String} modelName
      @return {String}
    */
    payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
      return underscore(decamelize(modelName));
    },

    /**
      Serializes a polymorphic type as a fully capitalized model name.
       @method serializePolymorphicType
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializePolymorphicType: function serializePolymorphicType(snapshot, json, relationship) {
      var key = relationship.key;
      var belongsTo = snapshot.belongsTo(key);
      var jsonKey = underscore(key + "_type");

      if (Ember['default'].isNone(belongsTo)) {
        json[jsonKey] = null;
      } else {
        json[jsonKey] = classify(belongsTo.modelName).replace('/', '::');
      }
    },

    /**
      Add extra step to `DS.RESTSerializer.normalize` so links are normalized.
       If your payload looks like:
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "flagged_comments": "api/comments/flagged" }
        }
      }
      ```
       The normalized version would look like this
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "flaggedComments": "api/comments/flagged" }
        }
      }
      ```
       @method normalize
      @param {subclass of DS.Model} typeClass
      @param {Object} hash
      @param {String} prop
      @return Object
    */
    normalize: function normalize(typeClass, hash, prop) {
      this.normalizeLinks(hash);
      return this._super(typeClass, hash, prop);
    },

    /**
      Convert `snake_cased` links  to `camelCase`
       @method normalizeLinks
      @param {Object} data
    */

    normalizeLinks: function normalizeLinks(data) {
      if (data.links) {
        var links = data.links;

        for (var link in links) {
          var camelizedLink = camelize(link);

          if (camelizedLink !== link) {
            links[camelizedLink] = links[link];
            delete links[link];
          }
        }
      }
    },

    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      modelClass.eachRelationship(function (key, relationshipMeta) {
        var relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, "deserialize");

        // prefer the format the AMS gem expects, e.g.:
        // relationship: {id: id, type: type}
        if (relationshipMeta.options.polymorphic) {
          extractPolymorphicRelationships(key, relationshipMeta, resourceHash, relationshipKey);
        }
        // If the preferred format is not found, use {relationship_name_id, relationship_name_type}
        if (resourceHash.hasOwnProperty(relationshipKey) && typeof resourceHash[relationshipKey] !== 'object') {
          var polymorphicTypeKey = this.keyForRelationship(key) + '_type';
          if (resourceHash[polymorphicTypeKey] && relationshipMeta.options.polymorphic) {
            var id = resourceHash[relationshipKey];
            var type = resourceHash[polymorphicTypeKey];
            delete resourceHash[polymorphicTypeKey];
            delete resourceHash[relationshipKey];
            resourceHash[relationshipKey] = { id: id, type: type };
          }
        }
      }, this);
      return this._super.apply(this, arguments);
    },

    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      var convertedFromRubyModule = singularize(key.replace('::', '/'));
      return normalizeModelName(convertedFromRubyModule);
    }
  });

  function extractPolymorphicRelationships(key, relationshipMeta, resourceHash, relationshipKey) {
    var polymorphicKey = decamelize(key);
    var hash = resourceHash[polymorphicKey];
    if (hash !== null && typeof hash === 'object') {
      resourceHash[relationshipKey] = hash;
    }
  }

  exports['default'] = ActiveModelSerializer;

});
define('active-model-adapter/index', ['exports', 'active-model-adapter/active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

	'use strict';

	exports['default'] = ActiveModelAdapter['default'];

	exports.ActiveModelAdapter = ActiveModelAdapter['default'];
	exports.ActiveModelSerializer = ActiveModelSerializer['default'];

});
define('ember-cli-content-security-policy', ['ember-cli-content-security-policy/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-infinite-scroll', ['ember-cli-infinite-scroll/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-infinite-scroll/components/infinite-scroll-container', ['exports', 'ember', 'ember-cli-infinite-scroll/mixins/infinite-scroll'], function (exports, Ember, InfiniteScrollMixin) {

  'use strict';

  var Component = Ember['default'].Component;

  /**
   A component that contains infinite scrolled content.

   @class InfiniteScrollContainerComponent
   @uses InfiniteScrollMixin
   */

  exports['default'] = Component.extend(InfiniteScrollMixin['default'], {
    classNames: 'infinite-scroll-container',

    /**
     Will be passed into the scroll listener to be the observed element on scroll.
      @property scrollContainer
     @type { String }
     @default '.infinite-scroll-container'
     */

    scrollContainer: '.infinite-scroll-container',

    /**
     Gives the component access to the store and starts the infinite query.
      @method didInsertElement
     */

    didInsertElement: function didInsertElement() {
      var store = this.container.lookup('store:main');
      this.set('store', store);
      this.infiniteQuery();
    },

    /**
     Record processing or anything else that needs to happen with the returned
     records.
      @method afterInfiniteQuery
     @param  newRecords { Object } the records returned in this cycle
     */

    afterInfiniteQuery: function afterInfiniteQuery(newRecords) {
      var infiniteContentPropertyName = this.get('infiniteContentPropertyName');
      var model = this.get(infiniteContentPropertyName);

      if (model) {
        model.addObjects(newRecords.get('content'));
      } else {
        this.set(infiniteContentPropertyName, newRecords);
      }
    }
  });

});
define('ember-cli-infinite-scroll/components/infinite-scroll', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Component = Ember['default'].Component;

  /**
   A component to trigger infinite scroll.

   @class InfiniteScrollComponent
   */

  exports['default'] = Component.extend({

    /**
     The name of the method to trigger
      @property performInfinite
     @type { String }
     @default 'performInfinite
     */

    performInfinite: 'performInfinite',

    /**
     The distance from the bottom at which the infinite scroll will fire.
      @property triggerDistance
     @type { Number }
     @default 0
     */

    triggerDistance: 0,

    /**
     Whether or not the infinite scroll can be triggered.
      @property infiniteScrollAvailable
     @type { Boolean }
     @default true
     */

    infiniteScrollAvailable: true,

    actions: {

      /**
       Triggers the `performInfinite` method.
        @event performInfinite
       */

      performInfinite: function performInfinite() {
        this.sendAction('performInfinite');
      }
    }
  });

});
define('ember-cli-infinite-scroll/mixins/infinite-scroll-route', ['exports', 'ember', 'ember-cli-infinite-scroll/mixins/infinite-scroll'], function (exports, Ember, InfiniteScrollMixin) {

  'use strict';

  var Mixin = Ember['default'].Mixin;
  var computed = Ember['default'].computed;
  var on = Ember['default'].on;

  /**
   A mixin for routes that need infinite scrolling.

   @class InfiniteScrollRouteMixin
   @uses InfiniteScrollMixin
   */

  exports['default'] = Mixin.create(InfiniteScrollMixin['default'], {

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

});
define('ember-cli-infinite-scroll/mixins/infinite-scroll', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Mixin = Ember['default'].Mixin;
  var run = Ember['default'].run;
  var computed = Ember['default'].computed;

  /**
   A mixin for infinite scrolls.

   @class InfiniteScrollMixin
   */

  exports['default'] = Mixin.create({

    /**
     True if a request has been initiated but not resolved.
      @property infiniteQuerying
     @default false
     */

    infiniteQuerying: false,

    /**
     The number of queries that have cycled.
      @property _cycleCount
     @type { Number }
     @default 0
     @private
     */

    _cycleCount: 0,

    /**
     True if the query can be sent.
      @property infiniteScrollAvailable
     @default true
     */

    infiniteScrollAvailable: true,

    /**
     True if there is more content on the server.
      @property hasMoreContent
     @type { Boolean }
     @default true
     */

    hasMoreContent: true,

    /**
     The start param.
      @property start
     @type { Number }
     @default 0
     */

    start: 0,

    /**
     The limit param.
      @property limit
     @type { Number }
     @default 12
     */

    limit: 12,

    /**
     The property that will be incremented after each cycle.
      @property infiniteIncrementProperty
     @type { String }
     @default 'start'
     */

    infiniteIncrementProperty: 'start',

    /**
     The property that will increment `infiniteIncrementProperty`.
      @property infiniteIncrementBy
     @type { String }
     @default 'limit'
     */

    infiniteIncrementBy: 'limit',

    /**
     The name of the property that the `infiniteScroll` records will be added to.
      @property infiniteContentPropertyName
     @type { String }
     @default 'model'
     */

    infiniteContentPropertyName: 'model',

    /**
     The model name that will be queried.
      @property infiniteModelType
     @type { String }
     @default ''
     */

    infiniteModelName: '',

    /**
     The default parameters.
      @property _fullQueryParams
     @default ['start', 'limit']
     @private
     */

    _fullQueryParams: computed('infiniteIncrementBy', 'infiniteIncrementProperty', 'infiniteQueryParams', function () {
      var defaultQueryParams = [this.get('infiniteIncrementBy'), this.get('infiniteIncrementProperty')];
      var infiniteQueryParams = this.get('infiniteQueryParams');
      return defaultQueryParams.concat(infiniteQueryParams);
    }),

    /**
     An array of params that are needed for the infinite query.
      @property infiniteQueryParams
     @type { Array }
     @default []
     */

    infiniteQueryParams: [],

    /**
     Does what's needed for the infinite scroll.
     - sets `infiniteQuerying` to `true`
     - if passed `modelName`, sets `infiniteModelName`
     - if passed `params`, sets `infiniteQueryParams`
     - calls `beforeInfiniteQuery`
     - calls `infiniteQuery`
     then:
     - calls `afterInfiniteQuery`
     - calls `_updateInfiniteProperties`
     - sets ` infiniteQuerying` to `false`
      @method performInfinite
     @param modelName { String } the model to be queried
     @param params { Object } params to use in the query
     @returns { Promise } the records
     */

    infiniteQuery: function infiniteQuery(modelName, params) {
      var _this = this;

      if (this.get('infiniteQuerying') || !this.get('infiniteScrollAvailable')) {
        return;
      }
      this.set('infiniteQuerying', true);

      if (modelName) {
        this.set('infiniteModelName', modelName);
      }

      if (params) {
        var paramsToSet = Ember['default'].keys(params);
        this.set('infiniteQueryParams', paramsToSet);
        this.setProperties(params);
      }

      var infiniteModelName = this.get('infiniteModelName');
      var fullQueryParams = this.get('_fullQueryParams');

      params = this.getProperties(fullQueryParams);

      this.beforeInfiniteQuery(params);
      var newRecords = this.infiniteDataQuery(infiniteModelName, params);
      newRecords.then(function (records) {
        var returnedContentLength = records.get('length');

        _this.afterInfiniteQuery(records);
        _this._updateInfiniteProperties(returnedContentLength);
        _this.set('infiniteQuerying', false);
      });

      return newRecords;
    },

    /**
     Called immediately before the infinite query starts.
      @method beforeInfiniteQuery
     @param params { Object } the params that will be used in the query
     */

    beforeInfiniteQuery: Ember['default'].K,

    /**
     The query that will be used.
      @method infiniteQuery
     @param modelName { String } the name of the model
     @param params { Object } the params that will be used in the query
     @return { Promise } the records
     */

    infiniteDataQuery: function infiniteDataQuery(modelName) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return this.store.query(modelName, params);
    },

    /**
     Record processing or anything else that needs to happen with the returned
     records.
      @method afterInfiniteQuery
     @param  newRecords { Object } the records returned in this cycle
     */

    afterInfiniteQuery: function afterInfiniteQuery(newRecords) {
      var contentPropertyName = this.get('infiniteContentPropertyName');
      var model = this.get(contentPropertyName);

      if (model) {
        model.addObjects(newRecords.get('content'));
      }
    },

    /**
     Calls `_updateInfiniteCount` and `updateInfiniteAvailable`.
      @method _updateScrollProperties
     @param addedLength { Number } the incremental length of the model
     @private
     */

    _updateInfiniteProperties: function _updateInfiniteProperties(addedLength) {
      this._updateInfiniteCount(addedLength);
      this.updateHasMoreContent(addedLength);
      this.incrementProperty('_cycleCount');
    },

    /**
     Increments a property after the infinite scroll is finished.
      @method _updateInfiniteCount
     @param addedLength { Number } the incremental length of the model
     @private
     */

    _updateInfiniteCount: function _updateInfiniteCount(addedLength) {
      var incrementProperty = this.get('infiniteIncrementProperty');

      this.incrementProperty(incrementProperty, addedLength);
    },

    /**
     Determines whether the infinite scroll should continue after it finishes.
      @method updateHasMoreContent
     @param addedLength { Number } the incremental length of the model
     */

    updateHasMoreContent: function updateHasMoreContent(addedLength) {
      var infiniteIncrementBy = this.get('infiniteIncrementBy');
      var shouldIncrement = this.get(infiniteIncrementBy);
      var hasMoreContent = addedLength >= shouldIncrement;
      this.set('hasMoreContent', hasMoreContent);
      this.set('infiniteScrollAvailable', hasMoreContent);
    },

    actions: {

      /**
       Debounces `_performInfinite`
        @event performInfinite
       */

      performInfinite: function performInfinite() {
        run.once(this, this.infiniteQuery);
      }
    }
  });

});
define('ember-infinity', ['ember-infinity/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-infinity/components/infinity-loader', ['exports', 'ember', 'ember-version-is'], function (exports, Ember, emberVersionIs) {

  'use strict';

  var InfinityLoaderComponent = Ember['default'].Component.extend({
    classNames: ["infinity-loader"],
    classNameBindings: ["infinityModel.reachedInfinity"],
    guid: null,
    eventDebounce: 10,
    loadMoreAction: 'infinityLoad',
    loadingText: 'Loading Infinite Model...',
    loadedText: 'Infinite Model Entirely Loaded.',
    destroyOnInfinity: false,
    developmentMode: false,
    scrollable: null,

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this._setupScrollable();
      this.set('guid', Ember['default'].guidFor(this));
      this._bindEvent('scroll');
      this._bindEvent('resize');
      this._checkIfInView();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this._unbindEvent('scroll');
      this._unbindEvent('resize');
    },

    _bindEvent: function _bindEvent(eventName) {
      var _this = this;

      this.get('_scrollable').on(eventName + '.' + this.get('guid'), function () {
        Ember['default'].run.debounce(_this, _this._checkIfInView, _this.get('eventDebounce'));
      });
    },

    _unbindEvent: function _unbindEvent(eventName) {
      this.get('_scrollable').off(eventName + '.' + this.get('guid'));
    },

    _checkIfInView: function _checkIfInView() {
      var selfOffset = this.$().offset().top;
      var scrollable = this.get("_scrollable");
      var scrollableBottom = scrollable.height() + scrollable.scrollTop();

      var inView = selfOffset < scrollableBottom;

      if (inView && !this.get('developmentMode')) {
        this.sendAction('loadMoreAction');
      }
    },

    _setupScrollable: function _setupScrollable() {
      var scrollable = this.get('scrollable');
      if (Ember['default'].typeOf(scrollable) === 'string') {
        var items = Ember['default'].$(scrollable);
        if (items.length === 1) {
          this.set('_scrollable', items.eq(0));
        } else if (items.length > 1) {
          throw new Error("Ember Infinity: Multiple scrollable elements found for: " + scrollable);
        } else {
          throw new Error("Ember Infinity: No scrollable element found for: " + scrollable);
        }
      } else if (scrollable === undefined || scrollable === null) {
        this.set('_scrollable', Ember['default'].$(window));
      } else {
        throw new Error("Ember Infinity: Scrollable must either be a css selector string or left empty to default to window");
      }
    },

    loadedStatusDidChange: Ember['default'].observer('infinityModel.reachedInfinity', 'destroyOnInfinity', function () {
      if (this.get('infinityModel.reachedInfinity') && this.get('destroyOnInfinity')) {
        this.destroy();
      }
    }),

    infinityModelPushed: Ember['default'].observer('infinityModel.length', function () {
      Ember['default'].run.scheduleOnce('afterRender', this, this._checkIfInView);
    })
  });

  if (emberVersionIs['default']('lessThan', '1.13.0')) {
    InfinityLoaderComponent.reopen({
      hasBlock: Ember['default'].computed.alias('template')
    });
  }

  exports['default'] = InfinityLoaderComponent;

});
define('ember-infinity/mixins/route', ['exports', 'ember', 'ember-version-is'], function (exports, Ember, ember_version_is) {

  'use strict';

  var keys = Object.keys || Ember['default'].keys;
  /**
    The Ember Infinity Route Mixin enables an application route to load paginated
    records for the route `model` as triggered by the controller (or Infinity Loader
    component).

    @class RouteMixin
    @namespace EmberInfinity
    @module ember-infinity/mixins/route
    @extends Ember.Mixin
  */
  exports['default'] = Ember['default'].Mixin.create({

    /**
      @private
      @property _perPage
      @type Integer
      @default 25
    */
    _perPage: 25,

    /**
      @private
      @property currentPage
      @type Integer
      @default 0
    */
    currentPage: 0,

    /**
      @private
      @property _extraParams
      @type Object
      @default {}
    */
    _extraParams: {},

    /**
      @private
      @property _boundParams
      @type Object
      @default {}
    */
    _boundParams: {},

    /**
      @private
      @property _loadingMore
      @type Boolean
      @default false
    */
    _loadingMore: false,

    /**
      @private
      @property _totalPages
      @type Integer
      @default 0
    */
    _totalPages: 0,

    /**
      @private
      @property _infinityModelName
      @type String
      @default null
    */
    _infinityModelName: null,

    /**
      @private
      @property _modelPath
      @type String
      @default 'controller.model'
    */
    _modelPath: 'controller.model',

    /**
     * Name of the "per page" param in the
     * resource request payload
     * @type {String}
     * @default  "per_page"
     */
    perPageParam: 'per_page',

    /**
     * Name of the "page" param in the
     * resource request payload
     * @type {String}
     * @default "page"
     */
    pageParam: 'page',

    /**
     * Path of the "total pages" param in
     * the HTTP response
     * @type {String}
     * @default "meta.total_pages"
     */
    totalPagesParam: 'meta.total_pages',

    /**
     * The supported findMethod name for
     * the developers Ember Data version.
     * Provided here for backwards compat.
     * @type {String}
     * @default "query"
     */
    _storeFindMethod: 'query',

    /**
      @private
      @property _canLoadMore
      @type Boolean
      @default false
    */
    _canLoadMore: Ember['default'].computed('_totalPages', 'currentPage', function () {
      var totalPages = this.get('_totalPages');
      var currentPage = this.get('currentPage');
      return totalPages && currentPage ? currentPage < totalPages : false;
    }),

    /**
      Use the infinityModel method in the place of `this.store.find('model')` to
      initialize the Infinity Model for your route.
       @method infinityModel
      @param {String} modelName The name of the model.
      @param {Object} options Optional, the perPage and startingPage to load from.
      @param {Object} boundParams Optional, any route properties to be included as additional params.
      @return {Ember.RSVP.Promise}
    */
    infinityModel: function infinityModel(modelName, options, boundParams) {
      var _this = this;

      if (ember_version_is.emberDataVersionIs('greaterThan', '1.0.0-beta.19.2') && ember_version_is.emberDataVersionIs('lessThan', '1.13.4')) {
        throw new Ember['default'].Error("Ember Infinity: You are using an unsupported version of Ember Data.  Please upgrade to at least 1.13.4 or downgrade to 1.0.0-beta.19.2");
      }

      if (ember_version_is.emberDataVersionIs('lessThan', '1.13.0')) {
        this.set('_storeFindMethod', 'find');
      }

      if (Ember['default'].isEmpty(this.store) || Ember['default'].isEmpty(this.store[this._storeFindMethod])) {
        throw new Ember['default'].Error("Ember Infinity: Ember Data store is not available to infinityModel");
      } else if (modelName === undefined) {
        throw new Ember['default'].Error("Ember Infinity: You must pass a Model Name to infinityModel");
      }

      this.set('_infinityModelName', modelName);

      options = options ? Ember['default'].merge({}, options) : {};
      var startingPage = options.startingPage || 1;
      var perPage = options.perPage || this.get('_perPage');
      var modelPath = options.modelPath || this.get('_modelPath');

      delete options.startingPage;
      delete options.perPage;
      delete options.modelPath;

      this.set('_perPage', perPage);
      this.set('_modelPath', modelPath);
      this.set('_extraParams', options);

      var requestPayloadBase = {};
      requestPayloadBase[this.get('perPageParam')] = perPage;
      requestPayloadBase[this.get('pageParam')] = startingPage;

      if (typeof boundParams === 'object') {
        this.set('_boundParams', boundParams);
        options = this._includeBoundParams(options, boundParams);
      }

      var params = Ember['default'].merge(requestPayloadBase, options);
      var promise = this.store[this._storeFindMethod](modelName, params);

      promise.then(function (infinityModel) {
        var totalPages = infinityModel.get(_this.get('totalPagesParam'));
        _this.set('currentPage', startingPage);
        _this.set('_totalPages', totalPages);
        infinityModel.set('reachedInfinity', !_this.get('_canLoadMore'));
        if (_this.infinityModelUpdated) {
          Ember['default'].run.scheduleOnce('afterRender', _this, 'infinityModelUpdated', {
            lastPageLoaded: startingPage,
            totalPages: totalPages,
            newObjects: infinityModel
          });
        }
      }, function () {
        throw new Ember['default'].Error("Ember Infinity: Could not fetch Infinity Model. Please check your serverside configuration.");
      });

      return promise;
    },

    /**
     Trigger a load of the next page of results.
      @method infinityLoad
     @return {Boolean}
     */
    _infinityLoad: function _infinityLoad() {
      var _this2 = this;

      var nextPage = this.get('currentPage') + 1;
      var perPage = this.get('_perPage');
      var totalPages = this.get('_totalPages');
      var modelName = this.get('_infinityModelName');
      var options = this.get('_extraParams');
      var boundParams = this.get('_boundParams');

      if (!this.get('_loadingMore') && this.get('_canLoadMore')) {
        this.set('_loadingMore', true);

        var requestPayloadBase = {};
        requestPayloadBase[this.get('perPageParam')] = perPage;
        requestPayloadBase[this.get('pageParam')] = nextPage;

        options = this._includeBoundParams(options, boundParams);
        var params = Ember['default'].merge(requestPayloadBase, this.get('_extraParams'));

        var promise = this.store[this._storeFindMethod](modelName, params);

        promise.then(function (newObjects) {

          _this2.updateInfinityModel(newObjects);
          _this2.set('_loadingMore', false);
          _this2.set('currentPage', nextPage);
          if (_this2.infinityModelUpdated) {
            Ember['default'].run.scheduleOnce('afterRender', _this2, 'infinityModelUpdated', {
              lastPageLoaded: nextPage,
              totalPages: totalPages,
              newObjects: newObjects
            });
          }
          if (!_this2.get('_canLoadMore')) {
            _this2.set(_this2.get('_modelPath') + '.reachedInfinity', true);
            if (_this2.infinityModelLoaded) {
              Ember['default'].run.scheduleOnce('afterRender', _this2, 'infinityModelLoaded', {
                totalPages: totalPages
              });
            }
          }
        }, function () {
          _this2.set('_loadingMore', false);
          throw new Ember['default'].Error("Ember Infinity: Could not fetch Infinity Model. Please check your serverside configuration.");
        });
      } else {
        if (!this.get('_canLoadMore')) {
          this.set(this.get('_modelPath') + '.reachedInfinity', true);
          if (this.infinityModelLoaded) {
            Ember['default'].run.scheduleOnce('afterRender', this, 'infinityModelLoaded', { totalPages: totalPages });
          }
        }
      }
      return false;
    },

    /**
     include any bound params into the options object.
      @method includeBoundParams
     @param {Object} options, the object to include bound params into.
     @param {Object} boundParams, an object of properties to be included into options.
     @return {Object}
     */
    _includeBoundParams: function _includeBoundParams(options, boundParams) {
      var _this3 = this;

      if (!Ember['default'].isEmpty(boundParams)) {
        keys(boundParams).forEach(function (k) {
          return options[k] = _this3.get(boundParams[k]);
        });
      }

      return options;
    },

    /**
     Update the infinity model with new objects
      @method updateInfinityModel
     @param {Ember.Enumerable} newObjects The new objects to add to the model
     @return {Ember.Array} returns the updated infinity model
     */
    updateInfinityModel: function updateInfinityModel(newObjects) {
      var infinityModel = this.get(this.get('_modelPath'));

      return infinityModel.pushObjects(newObjects.get('content'));
    },

    actions: {
      infinityLoad: function infinityLoad() {
        this._infinityLoad();
      }
    }
  });

});
define('ember-version-is', ['ember-version-is/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-version-is/index', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  /*global semver*/
  var is = function is(value, operation, version) {
    if (arguments.length === 2 || Ember['default'].isNone(version)) {
      Ember['default'].assert('range must be a valid semver range', semver.validRange(operation));
      return semver.satisfies(value, operation);
    }

    switch (operation) {
      case 'equalTo':
        return semver.eq(value, version);
      case 'greaterThan':
        return semver.gt(value, version);
      case 'greaterThanOrEqualTo':
        return semver.gte(value, version);
      case 'lessThan':
        return semver.lt(value, version);
      case 'lessThanOrEqualTo':
        return semver.lte(value, version);
      default:
        throw new Error("Ember Version Is: Please pass either 'equalTo', 'lessThan', 'lessThanOrEqualTo', 'greaterThan' or 'greatThanOrEqualTo' as the operation argument.");
    }
  };

  var emberVersionIs = function emberVersionIs(operation, value) {
    return is(Ember['default'].VERSION, operation, value);
  };

  var emberDataVersionIs = function emberDataVersionIs(operation, value) {
    return is(DS['default'].VERSION, operation, value);
  };

  exports['default'] = emberVersionIs;

  exports.is = is;
  exports.emberVersionIs = emberVersionIs;
  exports.emberDataVersionIs = emberDataVersionIs;

});//# sourceMappingURL=addons.map