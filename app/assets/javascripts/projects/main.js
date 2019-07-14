class LightBox{
  constructor(){
    this.initExitBtn()
    this.registerEventHandler()
  }

  registerEventHandler(){
    window.addEventListener('message', function(event) {
      // IMPORTANT: Check the origin of the data! 
      if (~event.origin.indexOf('http://')) {
        // The data has been sent from your site 
        // The data sent with postMessage is stored in event.data 
        // console.log(event.data)
        // eval(event.data)
      } else {
        // The data hasn't been sent from your site! 
        // Be careful! Do not use it. 
        return
      }
    })
  }

  initExitBtn(){
    let btn = $("<div class='btn-exit'>X</div>")
    $("body").append(btn)
  }

  sendInstructionToParent(){
    //ABT.projects.find().exit()
    window.parent.poseMessage("", "*");
  }
}


let lightBox = new LightBox()




// window.onmessage = function(e) {

//   // return

//   // var ifd = localStorage.iframeData || "";
//   // ifd += " ||| " + e.data
//   // localStorage.iframeData = ifd
//   // if (e.origin !== "http://example.com") {
//   //   return;
//   // }

//   // var payload = JSON.parse(e.data);

//   // var parent = window.parent;
//   // var data = "alert(1)";
//   // parent.postMessage(data, "*");

//   return
//   // switch (payload.action) {
//   //   case 'initialize':
//   //     // localStorage.setItem(payload.key, JSON.stringify(payload.data));
//   //     var data = "alert(1)";
//   //     parent.postMessage(data, "*");
//   //     break;
//   //   case 'get':
//   //     var parent = window.parent;
//   //     var data = localStorage.getItem(payload.key);
//   //     parent.postMessage(data, "*");
//   //     break;
//   //   case 'remove':
//   //     localStorage.removeItem(payload.key);
//   //     break;
//   // }
// };







// setInterval(function(){
//   window.parent.postMessage("send to parent", "*")
// }, 5000)