/* jshint ignore:start */

/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'active-model-adapter'], function (exports, ActiveModelAdapter) {

    'use strict';

    exports['default'] = ActiveModelAdapter['default'].extend({
        namespace: 'api/v1'
    });

});
define('frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'frontend/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default'],
    rootElement: '#ember'
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  $(function () {
    var token;
    token = $('meta[name="csrf-token"]').attr('content');
    return $.ajaxPrefilter(function (options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
    });
  });

  exports['default'] = App;

});
define('frontend/components/infinity-loader', ['exports', 'ember-infinity/components/infinity-loader'], function (exports, infinityLoader) {

	'use strict';

	exports['default'] = infinityLoader['default'];

});
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
define('frontend/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationController;

  ApplicationController = Ember['default'].Controller.extend({
    actions: {
      sign_out: function sign_out() {
        return Ember['default'].$.ajax({
          type: 'DELETE',
          url: "/users/sign_out",
          async: false,
          success: (function (_this) {
            return function () {
              return location.reload();
            };
          })(this)
        });
      }
    }
  });

  exports['default'] = ApplicationController;

});
define('frontend/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/initializers/active-model-adapter', ['exports', 'active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

  'use strict';

  exports['default'] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', ActiveModelAdapter['default']);
      application.register('serializer:-active-model', ActiveModelSerializer['default']);
    }
  };

});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('frontend/initializers/session', ['exports', 'simple-auth/session'], function (exports, Session) {

  'use strict';

  var CurrentUserInitializer, initialize;

  initialize = function (container, application) {
    window.App = application;
    return Session['default'].reopen({
      isLoggedIn: (function () {
        var id;
        id = null;
        Ember.$.ajax({
          type: 'GET',
          url: "/welcome/current_user_id",
          async: false,
          success: (function (_this) {
            return function (data) {
              return id = data.current_user_id;
            };
          })(this)
        });
        if (id === null) {
          return false;
        } else {
          return true;
        }
      }).property()
    });
  };

  CurrentUserInitializer = {
    name: 'currentUser',
    before: 'simple-auth',
    initialize: initialize
  };

  exports['default'] = CurrentUserInitializer;

  exports.initialize = initialize;

});
define('frontend/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'frontend/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth'] || {});
      setup['default'](container, application);
    }
  };

});
define('frontend/instance-initializers/app-version', ['exports', 'frontend/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('frontend/mixins/session', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var SessionMixin;

  SessionMixin = Ember['default'].Mixin.create({
    before_model: function before_model() {
      if (!this.session.get('isLoggedIn')) {
        this.transitionTo('root');
        return Ember['default'].run.later(function () {
          return window.App.reset();
        }, 100);
      }
    }
  });

  exports['default'] = SessionMixin;

});
define('frontend/models/grifter', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Grifter;

  Grifter = DS['default'].Model.extend({
    vk_screen_name: DS['default'].attr('string'),
    skype_id: DS['default'].attr('string'),
    photo: DS['default'].attr('string'),
    first_name: DS['default'].attr('string'),
    last_name: DS['default'].attr('string'),
    description: DS['default'].attr('string'),
    created_at: DS['default'].attr('string'),
    user: DS['default'].belongsTo('user', {
      async: true
    }),
    short_description: (function () {
      if (this.get('description').length > 50) {
        return this.get('description').substr(0, 50) + '...';
      } else {
        return this.get('description');
      }
    }).property('description'),
    formatted_created_at: (function () {
      var date, format;
      date = this.get('created_at');
      format = "Do MMM YY";
      return moment(date).locale('ru').format(format);
    }).property('created_at')
  });

  exports['default'] = Grifter;

});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var User;

  User = DS['default'].Model.extend({
    vk_screen_name: DS['default'].attr('string'),
    vk_photo: DS['default'].attr('string'),
    first_name: DS['default'].attr('string'),
    last_name: DS['default'].attr('string'),
    description: DS['default'].attr('string')
  });

  exports['default'] = User;

});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend();

  Router.map(function () {
    this.route('root', {
      path: '/'
    });
    return this.route('add');
  });

  exports['default'] = Router;

});
define('frontend/routes/add', ['exports', 'ember', 'frontend/mixins/session'], function (exports, Ember, SessionMixin) {

  'use strict';

  var AddRoute;

  AddRoute = Ember['default'].Route.extend(SessionMixin['default'], {
    model: function model() {
      return this.store.createRecord('grifter');
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = AddRoute;

});
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
define('frontend/templates/add', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1423
            },
            "end": {
              "line": 1,
              "column": 1622
            }
          },
          "moduleName": "frontend/templates/add.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","button-success button-block");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2,"class","fa fa-check");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("Заявка отправлена");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1,"class","text-center");
          var el2 = dom.createTextNode("Принятая заявка будет рассмотренна администрацией сообщества");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1622
            },
            "end": {
              "line": 1,
              "column": 1748
            }
          },
          "moduleName": "frontend/templates/add.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","button-violet button-block");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2,"class","fa fa-paper-plane");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("Отправить заявку");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["add"],[],["loc",[null,[1,1638],[1,1654]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1807
          }
        },
        "moduleName": "frontend/templates/add.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","page-header");
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","page-title");
        var el4 = dom.createTextNode("Добавление мошенника");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","page-description");
        var el4 = dom.createTextNode("Подкрепите свои обвинения доказательствами");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","page-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","add-grifter-form");
        var el5 = dom.createElement("form");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","left-column pull-left");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","form-group");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","right-column pull-right");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","form-group");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","left-column pull-left");
        var el7 = dom.createElement("div");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","right-column pull-right");
        var el7 = dom.createElement("div");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","page-sidebar");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","sidebar-module sidebar-module-inset");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","clearfix");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var element2 = dom.childAt(element1, [0, 0, 0]);
        var element3 = dom.childAt(element2, [2, 0]);
        var element4 = dom.childAt(element2, [3, 0]);
        var element5 = dom.childAt(element2, [4]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [0, 0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 0]),0,0);
        morphs[2] = dom.createAttrMorph(element3, 'class');
        morphs[3] = dom.createMorphAt(element3,0,0);
        morphs[4] = dom.createAttrMorph(element4, 'class');
        morphs[5] = dom.createMorphAt(element4,0,0);
        morphs[6] = dom.createAttrMorph(element5, 'class');
        morphs[7] = dom.createMorphAt(element5,0,0);
        morphs[8] = dom.createMorphAt(dom.childAt(element1, [1, 0]),0,0);
        return morphs;
      },
      statements: [
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.vk_screen_name",["loc",[null,[1,328],[1,348]]]]],[],[]],"class","form-control","type","text","placeholder","vk_id мошенника","disabled",["subexpr","@mut",[["get","isAdded",["loc",[null,[1,421],[1,428]]]]],[],[]]],["loc",[null,[1,314],[1,430]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.skype_id",["loc",[null,[1,517],[1,531]]]]],[],[]],"class","form-control","type","text","placeholder","skype_id мошенника","disabled",["subexpr","@mut",[["get","isAdded",["loc",[null,[1,607],[1,614]]]]],[],[]]],["loc",[null,[1,503],[1,616]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","model.errors.first_name.length",["loc",[null,[1,691],[1,721]]]],"error_border","normal"],[],["loc",[null,[1,686],[1,747]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.first_name",["loc",[null,[1,763],[1,779]]]]],[],[]],"class","form-control","type","text","placeholder","Имя мошенника *","disabled",["subexpr","@mut",[["get","isAdded",["loc",[null,[1,852],[1,859]]]]],[],[]]],["loc",[null,[1,749],[1,861]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","model.errors.last_name.length",["loc",[null,[1,938],[1,967]]]],"error_border","normal"],[],["loc",[null,[1,933],[1,993]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.last_name",["loc",[null,[1,1009],[1,1024]]]]],[],[]],"class","form-control","type","text","placeholder","Фамилия мошенника *","disabled",["subexpr","@mut",[["get","isAdded",["loc",[null,[1,1101],[1,1108]]]]],[],[]]],["loc",[null,[1,995],[1,1110]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","model.errors.description.length",["loc",[null,[1,1150],[1,1181]]]],"error_border","normal"],[],["loc",[null,[1,1145],[1,1207]]]]]]],
        ["inline","textarea",[],["value",["subexpr","@mut",[["get","model.description",["loc",[null,[1,1226],[1,1243]]]]],[],[]],"class","form-control","placeholder","Опишите действия кидалы *","disabled",["subexpr","@mut",[["get","isAdded",["loc",[null,[1,1314],[1,1321]]]]],[],[]]],["loc",[null,[1,1209],[1,1323]]]],
        ["block","if",[["get","isAdded",["loc",[null,[1,1429],[1,1436]]]]],[],0,1,["loc",[null,[1,1423],[1,1755]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 233
            },
            "end": {
              "line": 1,
              "column": 327
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","sign_out");
          var el2 = dom.createTextNode("Выйти из системы");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["sign_out"],[],["loc",[null,[1,265],[1,286]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 327
            },
            "end": {
              "line": 1,
              "column": 431
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Для того, чтобы подать жалобу, необходимо ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1,"href","/welcome/auth_by_vk");
          var el2 = dom.createTextNode("войти в систему");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 499
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","news-box");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","news");
        var el3 = dom.createTextNode("Информационная строка");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","close");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","fa fa-times");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","top-nav");
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","/");
        dom.setAttribute(el2,"class","logo pull-left");
        var el3 = dom.createTextNode("webgrifters.ru");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","navbar pull-right");
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","content-wrapper");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","session.isLoggedIn",["loc",[null,[1,239],[1,257]]]]],[],0,1,["loc",[null,[1,233],[1,438]]]],
        ["content","outlet",["loc",[null,[1,483],[1,493]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/components/infinite-scroll-container', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 13,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/infinite-scroll-container.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h3");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("hr");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("img");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("hr");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","container-body-text");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("hr");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [5]);
            var morphs = new Array(3);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
            morphs[1] = dom.createAttrMorph(element0, 'src');
            morphs[2] = dom.createUnsafeMorphAt(dom.childAt(fragment, [9]),1,1);
            return morphs;
          },
          statements: [
            ["content","post.title",["loc",[null,[4,6],[4,20]]]],
            ["attribute","src",["get","post.imageUrl",["loc",[null,[7,25],[7,38]]]]],
            ["content","post.body",["loc",[null,[10,6],[10,21]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/infinite-scroll-container.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","post.imageUrl",["loc",[null,[2,8],[2,21]]]]],[],0,null,["loc",[null,[2,2],[13,9]]]]
        ],
        locals: ["post"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 51
          }
        },
        "moduleName": "frontend/templates/components/infinite-scroll-container.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[1,8],[1,13]]]]],[],0,null,["loc",[null,[1,0],[14,9]]]],
        ["inline","infinite-scroll",[],["scrollContainer",["subexpr","@mut",[["get","scrollContainer",["loc",[null,[15,34],[15,49]]]]],[],[]]],["loc",[null,[15,0],[15,51]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('frontend/templates/components/infinite-scroll', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/infinite-scroll.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","ember-ic-you",[],["crossedTheLine","performInfinite","triggerDistance",["subexpr","@mut",[["get","triggerDistance",["loc",[null,[2,66],[2,81]]]]],[],[]],"scrollContainer",["subexpr","@mut",[["get","scrollContainer",["loc",[null,[2,98],[2,113]]]]],[],[]]],["loc",[null,[2,2],[2,115]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 9
          }
        },
        "moduleName": "frontend/templates/components/infinite-scroll.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","infiniteScrollAvailable",["loc",[null,[1,6],[1,29]]]]],[],0,null,["loc",[null,[1,0],[3,7]]]],
        ["content","yield",["loc",[null,[5,0],[5,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('frontend/templates/components/infinity-loader', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/infinity-loader.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["content","yield",["loc",[null,[2,2],[2,11]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/infinity-loader.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","loadedText",["loc",[null,[5,10],[5,24]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/infinity-loader.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","loadingText",["loc",[null,[7,10],[7,25]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/infinity-loader.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","infinityModel.reachedInfinity",["loc",[null,[4,8],[4,37]]]]],[],0,1,["loc",[null,[4,2],[8,9]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/infinity-loader.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","hasBlock",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[9,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/root', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 477
            },
            "end": {
              "line": 1,
              "column": 1242
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","grifter");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","image-wrapper");
          var el3 = dom.createElement("img");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h2");
          dom.setAttribute(el2,"class","grifter-name");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          dom.setAttribute(el2,"class","grifter-meta");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" добавил ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"target","_blank");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          dom.setAttribute(el2,"class","grifter-ban-short-info");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("hr");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","additional-links");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","pull-left");
          var el4 = dom.createElement("button");
          dom.setAttribute(el4,"class","button-violet button-small");
          var el5 = dom.createTextNode("Подробнее");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","pull-right");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4,"target","_blank");
          var el5 = dom.createElement("i");
          dom.setAttribute(el5,"class","fa fa-vk");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Профиль");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","clearfix");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(element0, [0, 0]);
          var element2 = dom.childAt(element0, [1]);
          var element3 = dom.childAt(element0, [2]);
          var element4 = dom.childAt(element3, [2]);
          var element5 = dom.childAt(element0, [5, 1, 0]);
          var morphs = new Array(9);
          morphs[0] = dom.createAttrMorph(element1, 'src');
          morphs[1] = dom.createMorphAt(element2,0,0);
          morphs[2] = dom.createMorphAt(element2,2,2);
          morphs[3] = dom.createMorphAt(element3,0,0);
          morphs[4] = dom.createAttrMorph(element4, 'href');
          morphs[5] = dom.createMorphAt(element4,0,0);
          morphs[6] = dom.createMorphAt(element4,2,2);
          morphs[7] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
          morphs[8] = dom.createAttrMorph(element5, 'href');
          return morphs;
        },
        statements: [
          ["attribute","src",["get","grifter.photo",["loc",[null,[1,564],[1,577]]]]],
          ["content","grifter.first_name",["loc",[null,[1,611],[1,633]]]],
          ["content","grifter.last_name",["loc",[null,[1,639],[1,660]]]],
          ["content","grifter.formatted_created_at",["loc",[null,[1,689],[1,721]]]],
          ["attribute","href",["concat",["http://vk.com/",["get","grifter.user.vk_screen_name",["loc",[null,[1,765],[1,792]]]]]]],
          ["content","grifter.user.first_name",["loc",[null,[1,812],[1,839]]]],
          ["content","grifter.user.last_name",["loc",[null,[1,845],[1,871]]]],
          ["content","grifter.short_description",["loc",[null,[1,913],[1,942]]]],
          ["attribute","href",["concat",["http://vk.com/",["get","grifter.vk_screen_name",["loc",[null,[1,1119],[1,1141]]]]]]]
        ],
        locals: ["grifter"],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 1364
              },
              "end": {
                "line": 1,
                "column": 1493
              }
            },
            "moduleName": "frontend/templates/root.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","button-violet button-block button-rounded");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2,"class","fa fa-plus");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("Добавить мошенника");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1338
            },
            "end": {
              "line": 1,
              "column": 1505
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","link-to",["add"],[],0,null,["loc",[null,[1,1364],[1,1505]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1505
            },
            "end": {
              "line": 1,
              "column": 1682
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"data-hint","Войдите в систему для подачи жалобы");
          dom.setAttribute(el1,"disabled","");
          dom.setAttribute(el1,"class","button-violet button-block hint hint--left");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2,"class","fa fa-plus");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("Добавить мошенника");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1862
          }
        },
        "moduleName": "frontend/templates/root.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","page-header");
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","page-title");
        var el4 = dom.createTextNode("Список мошенников в сфере веб-разработки");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","page-description");
        var el4 = dom.createTextNode("Проверьте разработчика, заказчика или добавьте нового \"кидалу\".");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","search-box");
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","button-violet");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5,"class","fa fa-search");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","input-wrapper");
        var el5 = dom.createElement("input");
        dom.setAttribute(el5,"type","text");
        dom.setAttribute(el5,"placeholder","Поиск по vk_id, имени и фамилии");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","page-content");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","grifters");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","page-sidebar");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","sidebar-module sidebar-module-inset");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Прежде чем добавлять мошенника, воспользуйтесь поиском.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","clearfix");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element6, [0, 0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element6, [1, 0]),0,0);
        morphs[2] = dom.createMorphAt(element6,3,3);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[1,485],[1,490]]]]],[],0,null,["loc",[null,[1,477],[1,1251]]]],
        ["block","if",[["get","session.isLoggedIn",["loc",[null,[1,1344],[1,1362]]]]],[],1,2,["loc",[null,[1,1338],[1,1689]]]],
        ["inline","infinity-loader",[],["infinityModel",["subexpr","@mut",[["get","model",["loc",[null,[1,1843],[1,1848]]]]],[],[]]],["loc",[null,[1,1811],[1,1850]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('frontend/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/resolver', ['exports', 'ember/resolver', 'frontend/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('frontend/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/start-app', ['exports', 'ember', 'frontend/app', 'frontend/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('frontend/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('frontend/tests/test-helper', ['frontend/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('frontend/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('frontend/tests/unit/controllers/add-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:add', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/initializers/session-test', ['ember', 'frontend/initializers/session', 'qunit'], function (Ember, session, qunit) {

  'use strict';

  var application, registry;

  application = null;

  registry = null;

  qunit.module('Unit | Initializer | session', {
    beforeEach: function beforeEach() {
      return Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        return application.deferReadiness();
      });
    }
  });

  qunit.test('it works', function (assert) {
    session.initialize(registry, application);
    return assert.ok(true);
  });

});
define('frontend/tests/unit/mixins/session-test', ['ember', 'frontend/mixins/session', 'qunit'], function (Ember, SessionMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | session');

  qunit.test('it works', function (assert) {
    var SessionObject, subject;
    SessionObject = Ember['default'].Object.extend(SessionMixin['default']);
    subject = SessionObject.create();
    return assert.ok(subject);
  });

});
define('frontend/tests/unit/models/grifter-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('grifter', 'Unit | Model | grifter', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/routes/add-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:add', 'Unit | Route | add', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/root-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:root', 'Unit | Route | root', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0+"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

if (runningTests) {
  require("frontend/tests/test-helper");
} else {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map