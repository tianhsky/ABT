window.ABT.models.core.Pclient = class Model{

  constructor(client, config){
    this.client = client
    this.config = config
    this.projects = []
  }

  setup(){
    const self = this

    // session
    ABT.utils.Session.setupSessionID()

    // project
    self.projects = []
    let activeProjects = self.client.projects
    for(let p of activeProjects){
      // for each active project
      let project = new ABT.models.core.Project(self.client, p)
      // check if it is valid based on global trigger
      if(project.isGlobalTriggersValid()){
        // if so, register action trigger
        self.projects.push(project)
        project.registerActionTriggers()
      }
    }
  }

  // helpers


}