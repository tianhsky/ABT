window.ABT.models.core.Trigger = class Model{

  constructor(client, project, trigger){
    this.client = client
    this.project = project
    this.trigger = trigger
  }

  isValid(){
    // implement in child class (only for global triggers)
  }

  register(){
    // implement in child class (only for action triggers)
  }

  static createTriggerFor(client, project, trigger){
    if(trigger.match_type == 'url'){
      return new ABT.models.trigger.global.Url(client, project, trigger)
    }
    else if(trigger.match_type == 'device_type'){
      return new ABT.models.trigger.global.DeviceType(client, project, trigger)
    }
    else if(trigger.match_type == 'exit_intent'){
      return new ABT.models.trigger.action.ExitIntent(client, project, trigger)
    }
    else{
      throw "Trigger not supported"
    }
  }

}