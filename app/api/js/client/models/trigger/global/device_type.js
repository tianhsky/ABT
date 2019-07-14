window.ABT.models.trigger.global.DeviceType = class Model extends window.ABT.models.core.Trigger{


  isValid(){
    let self = this
    let valid = false

    // check device type
    let deviceType = null
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      deviceType = 'mobile'
    }
    else{
      deviceType = 'desktop'
    }

    let matchDetail = self.trigger.match_detail
    let checks = []
    for (let c of matchDetail.conditions){
      let isDeviceTypeMatched = deviceType==c
      checks.push(isDeviceTypeMatched)
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

  register(){
    return null
  }

  // helpers

}