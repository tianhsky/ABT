window.addEventListener("load", function(evt) {

  ABT.pclient = new ABT.models.core.Pclient(ABT.state.client, ABT.state.config)
  ABT.pclient.setup()

})