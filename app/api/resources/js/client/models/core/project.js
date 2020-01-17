window.ABT.models.core.Project = class Model{

  constructor(client, project){
    this.client = client
    this.project = project
  }

  isGlobalTriggersValid(){
    const self = this
    let valid = true
    for(let t of self.project.triggers.global){
      let trigger = ABT.models.core.Trigger.createTriggerFor(self.client, self.project, t)
      if(!trigger.isValid()){
        valid = false
      }
    }
    return valid
  }

  registerActionTriggers(){
    const self = this
    for(let t of self.project.triggers.action){
      let trigger = ABT.models.core.Trigger.createTriggerFor(self.client, self.project, t)
      trigger.register()
    }
  }


  // helpers


}