window.ABT.models.trigger.action.ExitIntent = class Model extends window.ABT.models.core.Trigger{

  isValid(){
    return null
  }

  register(){
    const self = this

    ABT.utils.$("body").mouseleave((e) => {
      let x = e.clientX
      let y = e.clientY
      let valid = self.isValidNow(x, y)

      if(valid){
        self.triggerAction()
      }
    })
  }

  isValidNow(x, y){
    const self = this
    let valid =  false
    let matchDetail = self.trigger.match_detail

    let exitPosition = self.getExitPosition(x, y)

    let checks = []
    for (let c of matchDetail.conditions){
      let match = (exitPosition==c.str)
      checks.push(match)
    }

    if(matchDetail.relation == 'and'){
      let invalidItems = checks.filter((i)=>{return i==false})
      valid = (invalidItems.length == 0)
    }
    else if(matchDetail.relation == 'or'){
      let validItems = checks.filter((i)=>{return i==true})
      valid = (validItems.length > 0)
    }
    else{
      throw "Unsupported relation type"
    }

    return valid
  }


  // helpers
  getExitPosition(x, y){
    let p = null
    let xLeft = 0
    let xRight = window.innerWidth
    let yTop = 0
    let yBot = window.innerHeight
    if(x <= xLeft){
      p = 'left' 
    }
    if(y <= yTop){
      p = 'top' 
    }
    if(x >= xRight){
      p = 'right' 
    }
    if(y >= yBot){
      p = 'bottom' 
    }
    // console.log(p, x, y)
    return p
  }

  triggerAction(){
    const self = this
    let action = self.project.action
    if(action.action_type == 'lightbox'){
      let lightbox = self.lightbox
      if(!lightbox){
        lightbox = new ABT.models.action.Lightbox(self.client, self.project, action)
        self.lightbox = lightbox
      }
      lightbox.enterWithCallbacks()
    }
    else{
      throw 'Action type not supported'
    }
  }

}