module APIHelpers
  module ParamsHelper
    def strong_params
      ActionController::Parameters.new(params)
    end
  end
end