`import Ember from 'ember'`

AddController = Ember.Controller.extend

  isAdded: false

  actions:
    add: ->
      @model.save().then =>
        @set 'isAdded', true

`export default AddController`
