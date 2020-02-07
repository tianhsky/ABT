class ABTFrame{
  constructor(){
    this.registerChildFrameEventHandler()
  }

  registerChildFrameEventHandler(){
    window.addEventListener('message', function(event) {
      if (~event.origin.indexOf('http://')) {
        const data = event.data
        // example format for data: {action: ""}
        console.log("Parent Event:", data)
        if(data){
          try{
            let json = JSON.parse(data)
            eval(json.action)
          }
          catch(err){
            console.log("Parent Event Err:", err)
          }
        }
      } else {
        // The data hasn't been sent from your site! 
        // Be careful! Do not use it. 
        return
      }
    })
  }

  // json => {action: ""}
  sendInstructionToParent(json){
    const str = JSON.stringify(json)
    window.parent.poseMessage(str, "*");
  }
}


window.ABTFrame = new ABTFrame()


