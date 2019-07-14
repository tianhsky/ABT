class BrowserInfo
  include Mongoid::Document

  field :user_agent, type: String
  field :window_size, type: Hash # {width: int, height: int}

  embedded_in :event_log, class_name: "EventLog"

end