module APIHelpers
  module PclientHelper

    def pclient
      @pclient ||= Pclient.find(params[:pclient_id])
    end

    def pclient_state_json
      @pclient_state ||= ProjectService.clientProjectsJson(pclient: pclient, status:'active')
    end

    def get_js(path:nil, content:nil)
      js = ""
      if content
        js = content
      elsif path
        p = File.expand_path(path, File.dirname(__FILE__))
        js = File.read(p)
      end

      js
    end

    def compile_js(path:nil, content:nil, compile:true)
      js = get_js(path: path, content: content)
      if compile
        Babel::Transpiler.transform(js).as_json['code']
      else
        js
      end
    end

    def uglify_js(path:nil, content:nil)
      js = get_js(path: path, content: content)
      Uglifier.new(:harmony => true).compile(js)
    end

    def pclient_js
      js = []
      # load vendor libs
      js << compile_js(path: "../resources/js/client/vendors/jquery.js", compile: false)
      js << compile_js(path: "../resources/js/client/vendors/cookie.js", compile: false)
      js << compile_js(path: "../resources/js/client/vendors/rsvp.js", compile: false)

      # init global vars
      js << compile_js(path: "../resources/js/client/mains/vars.js")
      js << compile_js(content: "window.ABT.state = #{pclient_state_json.to_json}")

      # utils
      js << compile_js(path: "../resources/js/client/utils/browser.js")
      js << compile_js(path: "../resources/js/client/utils/session.js")
      js << compile_js(path: "../resources/js/client/utils/request.js")

      # cores
      js << compile_js(path: "../resources/js/client/models/core/pclient.js")
      js << compile_js(path: "../resources/js/client/models/core/project.js")
      js << compile_js(path: "../resources/js/client/models/core/trigger.js")
      js << compile_js(path: "../resources/js/client/models/core/action.js")

      # triggers global
      js << compile_js(path: "../resources/js/client/models/trigger/global/url.js")
      js << compile_js(path: "../resources/js/client/models/trigger/global/device_type.js")

      # triggers action
      js << compile_js(path: "../resources/js/client/models/trigger/action/exit_intent.js")

      # actions
      js << compile_js(path: "../resources/js/client/models/action/lightbox.js")


      # starter
      js << compile_js(path: "../resources/js/client/mains/main.js")

      content = js.join("\n")

      uglify_js(content: content)
    end

  end
end
