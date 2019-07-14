window.ABT.models.core.Action = class Model{

  constructor(client, project, action){
    this.client = client
    this.project = project
    this.action = action
  }

  enterWithCallbacks(){
    let self = this
    self.beforeEnter().then((v) => {
      self.enter()
    }).then((v) => {
      self.afterEnter()
    })
  }

  exitWithCallbacks(){
    let self = this
    self.beforeExit().then((v) => {
      self.exit()
    }).then((v) => {
      self.afterExit()
    })
  }

  // implement in child class, all these should return Promise
  beforeEnter(){ return new RSVP.Promise((resolve, reject) => {resolve()}) }
  enter(){ return new RSVP.Promise((resolve, reject) => {resolve()}) }
  afterEnter(){ return new RSVP.Promise((resolve, reject) => {resolve()}) }
  beforeExit(){ return new RSVP.Promise((resolve, reject) => {resolve()}) }
  exit(){ return new RSVP.Promise((resolve, reject) => {resolve()}) }
  afterExit(){ return new RSVP.Promise((resolve, reject) => {resolve()}) }

  logAction(action){
    let self = this
    let promise = ABT.utils.Request.postJson({
      path: '/api/v1/events',
      data: {
        event_log: {
          project_id: self.project.id,
          browser_info_attributes: {
            user_agent: ABT.utils.Browser.getUserAgent(),
            window_size: ABT.utils.Browser.getWindowSize()
          },
          action_info_attributes: action
        }
      }
    })
    return promise
  }

}