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
              "column": 1256
            },
            "end": {
              "line": 1,
              "column": 1393
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
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1393
            },
            "end": {
              "line": 1,
              "column": 1570
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
            "column": 1822
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
        var el6 = dom.createTextNode("Пожалуйста, прежде тем, как добавить нового мошенника, воспользуйтесь поиском.");
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
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1, 0]),0,0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","session.isLoggedIn",["loc",[null,[1,1262],[1,1280]]]]],[],0,1,["loc",[null,[1,1256],[1,1577]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});