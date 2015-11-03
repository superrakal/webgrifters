`import Session from "simple-auth/session"`

initialize = (container, application)->
  window.App = application

  Session.reopen
    isLoggedIn: (->
      id = null
      Ember.$.ajax
        type: 'GET'
        url: "/welcome/current_user_id"
        async: false
        success: (data) =>
           id = data.current_user_id
      if id == null
        false
      else
        true
    ).property()

    currentUser: (->
      id = null
      Ember.$.ajax
        type: 'GET'
        url: "/welcome/current_user_id"
        async: false
        success: (data) =>
          id = data.current_user_id
      container.lookup('store:main').find('user', id)
    ).property()


CurrentUserInitializer =
  name: 'currentUser'
  before: 'simple-auth'
  initialize: initialize

`export {initialize}`
`export default CurrentUserInitializer`
