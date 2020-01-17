window.ABT.models.trigger.global.Url = class Model extends window.ABT.models.core.Trigger{


  isValid(){
    const self = this
    let valid = false
    let matchDetail = self.trigger.match_detail
    let checks = []
    for (let c of matchDetail.conditions){
      checks.push(self.checkCondition(c))
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
  checkCondition(condition){
    let valid = false
    let url = window.location.href
    if(condition.rule == 'contains'){
      if(url.includes(condition.str)){
        valid = true
      }
      else{
        valid = false
      }
    }
    else if(condition.rule == 'does not contain'){
      if(!url.includes(condition.str)){
        valid = true
      }
      else{
        valid = false
      }
    }

    return valid
  }

}