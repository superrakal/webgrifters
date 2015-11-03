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
              "column": 230
            },
            "end": {
              "line": 1,
              "column": 324
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
          ["element","action",["sign_out"],[],["loc",[null,[1,262],[1,283]]]]
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
              "column": 324
            },
            "end": {
              "line": 1,
              "column": 428
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
            "column": 496
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
        var el3 = dom.createTextNode("Grifters.ru");
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
        ["block","if",[["get","session.isLoggedIn",["loc",[null,[1,236],[1,254]]]]],[],0,1,["loc",[null,[1,230],[1,435]]]],
        ["content","outlet",["loc",[null,[1,480],[1,490]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});