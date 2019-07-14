module APIHelpers
  module EventLogHelper

    def save_event_log
      get_visitor_session
      set_session_visitor

      @event_log = EventLog.new(event_log_params)
      @event_log.visitor_session = @visitor_session
      @event_log.save
      @event_log
    end

    def event_log_params
      strong_params.require(:event_log).permit(
        :project_id,
        :browser_info_attributes => [
          :user_agent,
          :window_size => [:width, :height]
        ],
        :action_info_attributes => [
          :action_type, 
          :action_detail
        ]
      )
    end
  end
end