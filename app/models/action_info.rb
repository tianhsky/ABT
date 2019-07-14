class ActionInfo
  include Mongoid::Document

  field :action_type, type: String
  field :action_detail, type: Hash

  embedded_in :event_log, class_name: "EventLog"
  
end