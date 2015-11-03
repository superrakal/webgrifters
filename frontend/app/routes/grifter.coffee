`import Ember from 'ember'`

GrifterRoute = Ember.Route.extend

  model: (params)->
    @store.find('grifter', params.id)

  setupController: (controller, model) ->
    controller.set('model', model)

`export default GrifterRoute`
