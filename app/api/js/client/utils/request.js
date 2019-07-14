window.ABT.utils.Request = class Model{

  static postJson(opts){
    // console.log("post", opts)
    let path = opts.path
    let data = opts.data

    let promise = new RSVP.Promise((resolve, reject) => {
      let url = `${ABT.pclient.config.host}${opts.path}`
      data.sid = ABT.utils.Session.setupSessionID()
      console.log(data)
      ABT.utils.$.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        complete: (jqXHR, textStatus) => {
          resolve(jqXHR, textStatus)
          return
        }
      })
    })
    return promise
  }


}