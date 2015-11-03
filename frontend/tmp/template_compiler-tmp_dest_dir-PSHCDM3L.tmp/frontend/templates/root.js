export default Ember.HTMLBars.template((function() {
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