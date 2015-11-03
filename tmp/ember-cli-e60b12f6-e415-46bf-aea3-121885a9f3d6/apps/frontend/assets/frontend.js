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
    vk_id: DS['default'].attr('string'),
    skype_id: DS['default'].attr('string'),
    first_name: DS['default'].attr('string'),
    last_name: DS['default'].attr('string'),
    description: DS['default'].attr('string')
  });

  exports['default'] = Grifter;

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
define('frontend/routes/root', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var RootRoute;

	RootRoute = Ember['default'].Route.extend();

	exports['default'] = RootRoute;

});
define('frontend/templates/add', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
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
            "column": 1271
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
        var el8 = dom.createElement("input");
        dom.setAttribute(el8,"type","text");
        dom.setAttribute(el8,"placeholder","vk_id мошенника");
        dom.setAttribute(el8,"class","form-control");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","right-column pull-right");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","form-group");
        var el8 = dom.createElement("input");
        dom.setAttribute(el8,"type","text");
        dom.setAttribute(el8,"placeholder","skype_id мошенника");
        dom.setAttribute(el8,"class","form-control");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","left-column pull-left");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","form-group");
        var el8 = dom.createElement("input");
        dom.setAttribute(el8,"type","text");
        dom.setAttribute(el8,"placeholder","Фамилия мошенника");
        dom.setAttribute(el8,"class","form-control");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","right-column pull-right");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","form-group");
        var el8 = dom.createElement("input");
        dom.setAttribute(el8,"type","text");
        dom.setAttribute(el8,"placeholder","Имя мошенника");
        dom.setAttribute(el8,"class","form-control");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","form-group");
        var el7 = dom.createElement("textarea");
        dom.setAttribute(el7,"placeholder","Опишите действия кидалы");
        dom.setAttribute(el7,"class","form-control");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","page-sidebar");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","sidebar-module sidebar-module-inset");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","button-violet button-block");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6,"class","fa fa-paper-plane");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Отправить заявку");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Принятая заявка будет рассмотренна администрацией сообщества.");
        dom.appendChild(el5, el6);
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
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
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
define('frontend/templates/root', ['exports'], function (exports) {

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
                "line": 1,
                "column": 1282
              },
              "end": {
                "line": 1,
                "column": 1411
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
              "column": 1256
            },
            "end": {
              "line": 1,
              "column": 1423
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
          ["block","link-to",["add"],[],0,null,["loc",[null,[1,1282],[1,1423]]]]
        ],
        locals: [],
        templates: [child0]
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
              "column": 1423
            },
            "end": {
              "line": 1,
              "column": 1600
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
            "column": 1747
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
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","grifter");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","image-wrapper");
        var el7 = dom.createElement("img");
        dom.setAttribute(el7,"src","http://placehold.it/200x200");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"class","grifter-name");
        var el7 = dom.createTextNode("Егор Топольняк");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","grifter-meta");
        var el7 = dom.createTextNode("1 янв. 2015 добавил ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","#");
        var el8 = dom.createTextNode("Егор Топольняк");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","grifter-ban-short-info");
        var el7 = dom.createTextNode("nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("hr");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","additional-links");
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","pull-left");
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"class","button-violet button-small");
        var el9 = dom.createTextNode("Подробнее");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","pull-right");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","fa fa-vk");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("Профиль");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","clearfix");
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
        var el5 = dom.createElement("p");
        dom.setAttribute(el5,"class","text-center");
        var el6 = dom.createTextNode("Принятая заявка будет рассмотренна администрацией сообщества.");
        dom.appendChild(el5, el6);
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1, 0]),0,0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","session.isLoggedIn",["loc",[null,[1,1262],[1,1280]]]]],[],0,1,["loc",[null,[1,1256],[1,1607]]]]
      ],
      locals: [],
      templates: [child0, child1]
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