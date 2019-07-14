window.ABT.models.action.Lightbox = class Model extends window.ABT.models.core.Action{

  enter() {
    let self = this
    let promise = new RSVP.Promise((resolve, reject) => {
      if(!self.checkCondition()){
        reject()
        return
      }

      let src = `${ABT.pclient.config.host}/projects/${self.project.id}`
      let iframe = ABT.utils.$('<iframe>')
      iframe.attr("src", src)
      ABT.utils.$('body').append(iframe)

      self.iframe = iframe
      ABT.iframe = self.iframe

      self.applyCss(iframe)
      self.initMessageHandler()

      // after enter
      self.incrementSessionEntersCount()

      resolve()
      return
    })
    return promise
  }

  afterEnter(){
    let self = this
    let action = {
      action_type: "lightbox_open",
      action_detail: {
      }
    }
    return self.logAction(action)
  }

  exit(){
    let self = this
    let promise = new RSVP.Promise((resolve, reject) => {
      if(self.iframe){
        self.iframe.remove()
        self.iframe = null
      }
      if(self.mask){
        self.mask.remove()
        self.mask = null
      }
      resolve()
      return
    })
    return promise
  }

  afterExit(){
    let self = this
    let action = {
      action_type: "lightbox_exit",
      action_detail: {
      }
    }
    return self.logAction(action)
  }

  // helpers

  getEntersCountCookieName(){
    return `abt-p-${this.project.id}-action-enters_count`
  }

  getSessionEntersCount(){
    let entersCount = ABT.utils.Cookie.getJSON(this.getEntersCountCookieName())
    if(!entersCount){
      entersCount = 0
    }
    else{
      entersCount = parseInt(entersCount)
    }
    return entersCount
  }

  incrementSessionEntersCount(){
    let count = this.getSessionEntersCount()
    let next = count + 1
    ABT.utils.Cookie.set(this.getEntersCountCookieName(), next)
  }

  checkCondition(){
    if(this.iframe){
      return false
    }
    let valid = true

    let max_enters_per_session = this.action.max_enters_per_session
    if(max_enters_per_session){
      let entersCount = this.getSessionEntersCount()
      if(max_enters_per_session > entersCount){
        valid = true
      }
      else{
        valid = false
      }
    }

    console.log("Action Check Lightbox:", valid)
    return valid
  }

  applyCss(iframe){
    let css = this.action.action_detail.css
    if(css){
      iframe.css(css)
    }

    // apply mask
    this.ensureMask(iframe)

    // center element
    this.ensureCenter(iframe)
  }

  ensureCenter(iframe){
    let $ = ABT.utils.$

    let css = {
      "position": "absolute",
      "top": Math.max(0, (($(window).height() - iframe.outerHeight()) / 2) + $(window).scrollTop()) + "px",
      "left": Math.max(0, (($(window).width() - iframe.outerWidth()) / 2) + $(window).scrollLeft()) + "px",
      "z-index": 500
    }

    iframe.css(css)
  }

  ensureMask(iframe){
    let self = this
    if(self.mask){
      return
    }

    let $ = ABT.utils.$
    let mask = $("<div>")
    let css = {
      "position": "fixed",
      "top": 0,
      "background": "black",
      "opacity": 0.8,
      "width": "100%",
      "height": "100%",
      "z-index": 400
    }
    mask.css(css)

    mask.bind("click", (e)=>{
      self.exitWithCallbacks()
    })

    self.mask = mask

    $("body").append(mask)
  }

  // iframe send an instruction for parent to execute
  initMessageHandler(){
    window.addEventListener('message', function(event) {
      // IMPORTANT: Check the origin of the data! 
      if (~event.origin.indexOf('http')) {
        // The data has been sent from your site 
        let data = event.data
        if(data && data.action){
          eval(data.action)
        }
        // localStorage.ifr_data = event.data
      } else {
        // The data hasn't been sent from your site! 
        // Be careful! Do not use it. 
        return;
      }
    });
  }

}