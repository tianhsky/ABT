class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def set_embeddable_headers
    response.headers["X-FRAME-OPTIONS"] = "ALLOWALL"
  end

  def set_access_control_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Request-Method'] = '*'
  end

end
