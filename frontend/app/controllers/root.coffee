`import Ember from 'ember'`

RootController = Ember.Controller.extend
  queryParams: ['search']

  search_scope: null

  actions:
    search: ->
      params = {}
      params['search'] = @get 'search_scope' || null
      @transitionToRoute queryParams: params

`export default RootController`
