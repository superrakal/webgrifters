`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route";`

RootRoute = Ember.Route.extend InfinityRoute,

  queryParams:
    search:
      refreshModel: true

  model: (params)->
    @infinityModel("grifter", { perPage: 5, startingPage: 1, search: params["search"]})

  setupController: (controller, model) ->
    controller.set 'model', model

`export default RootRoute`
