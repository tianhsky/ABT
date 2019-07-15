class Pclient
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  field :name, type: String

  has_many :projects, class_name: "Project"
  has_many :event_logs, class_name: "EventLog"
  has_many :visitor_sessions, class_name: "VisitorSession"

end
