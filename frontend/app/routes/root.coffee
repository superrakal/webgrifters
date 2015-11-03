`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route";`

RootRoute = Ember.Route.extend InfinityRoute,

  model: ->
    @infinityModel("grifter", { perPage: 5, startingPage: 1 })

  setupController: (controller, model) ->
    controller.set 'model', model

`export default RootRoute`
