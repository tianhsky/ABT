window.ABT.models.action.Lightbox = class Model extends window.ABT.models.core.Action{

  enter() {
    const self = this
    let promise = new RSVP.Promise((resolve, reject) => {
      if(!self.checkCondition()){
        reject()
        return
      }

      self.executeCallbackJS('before_enter')

      self.showMask()
      const iframe = self.showIframe()

      self.applyCss(iframe)
      self.initMessageHandler()

      // after enter
      self.incrementSessionEntersCount()

      // reg listener
      self.setupGlobalListener()

      resolve()
      return
    })
    return promise
  }

  afterEnter(){
    const self = this
    self.executeCallbackJS('after_enter')
    let action = {
      action_type: "lightbox_open",
      action_detail: {
      }
    }
    return self.logAction(action)
  }

  exit(){
    const self = this
    let promise = new RSVP.Promise((resolve, reject) => {
      self.executeCallbackJS('before_close')

      if(self.iframe){
        self.iframe.remove()
        ABT.utils.$(".abt-iframe-container").remove()
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
    const self = this
    self.executeCallbackJS('after_close')
    let action = {
      action_type: "lightbox_exit",
      action_detail: {
      }
    }
    return self.logAction(action)
  }

  // helpers

  setupGlobalListener(){
    const self = this
    window.ABT.listeners.lightbox = {
      exit: self.exitWithCallbacks.bind(self)
    }
  }

  showIframe(){
    const self = this

    // container
    let container = ABT.utils.$('<div class="abt-iframe-container">')
    let containerCSS = {
      "overflow": "hidden",
      "position": "fixed",
      "z-index": "500",
      "left": 0,
      "right": 0,
      "margin-left": "auto",
      "margin-right": "auto",
      "top": "10%",
    }
    container.css(containerCSS)
    const customCSS = self.action.action_detail.css
    container.css(customCSS)

    // iframe
    let iframe = ABT.utils.$('<iframe>')
    const src = `${ABT.pclient.config.host}/projects/${self.project.id}`
    iframe.attr("src", src)
    iframeCSS = {
      "width": "100%",
      "height": "100%",
      "border": 0
    }
    iframe.css(iframeCSS)

    // exit btn
    let exitBtn = $("<div>X</div>")
    const exitBtnCSS = {
      "position": "absolute",
      "top": "5px",
      "right": "10px",
      "font-weight": "bold",
      "border": "1px solid transparent",
      "border-radius": "100px",
      "width": "22px",
      "height": "22px",
      "text-align": "center",
      "line-height": "1",
      "cursor": "pointer",
      "background": "#676767",
      "color": "white"
    }
    exitBtn.css(exitBtnCSS)
    exitBtn.bind("click", (e)=>{
      self.exitWithCallbacks()
    })

    // dom
    container.append(iframe)
    container.append(exitBtn)
    ABT.utils.$('body').append(container)
    // self.mask.append(container)

    self.iframe = iframe
    ABT.iframe = self.iframe

    return iframe
  }

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
    // if(css){
    //   iframe.css(css)
    // }

    // center element
    // this.ensureCenter(iframe)
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

  showMask(){
    const self = this
    if(self.mask){
      return
    }

    let $ = ABT.utils.$
    let mask = $('<div class="abt-mask">')
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

    return mask
  }

  executeCallbackJS(stage){
    const self = this
    const code = self.action.callback_js[stage]
    if(code){
      try{
        eval(code)
      }catch(err){

      }
    }
  }

  // iframe send an instruction for parent to execute
  initMessageHandler(){
    window.addEventListener('message', function(event) {
      // IMPORTANT: Check the origin of the data! 
      if (~event.origin.indexOf('http')) {
        // The data has been sent from your site 
        const data = event.data
        console.log("Child Event:", data)
        if(data){
          try{
            let json = JSON.parse(data)
            eval(json.action)
          }
          catch(err){
            console.log("Child Event Err:", err)
          }
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