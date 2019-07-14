window.ABT.utils.Session = class Model{

  static genSessionID(){
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  static setupSessionID(){
    let sessionIDKey = 'abt-sid'
    let sessionTimeoutMinutes = 30
    let sessionTimeoutDays = (1/24)*(sessionTimeoutMinutes/60)

    let sessionID = window.ABT.utils.Cookie.get(sessionIDKey)
    if(!sessionID){
      sessionID = Model.genSessionID()
    }
    window.ABT.utils.Cookie.set(sessionIDKey, sessionID, { expires: sessionTimeoutDays })
    return sessionID
  }

  static getSessionID(){
    let sessionIDKey = 'abt-sid'
    let sessionID = window.ABT.utils.Cookie.get(sessionIDKey)
    return sessionID
  }


}