class VisitorSession
  include Mongoid::Document
  include Mongoid::Timestamps

  field :uuid, type: String
  
  embeds_one :visitor, class_name: "Visitor"

  belongs_to :pclient, class_name: "Pclient", optional: true
  has_many :event_logs, class_name: "EventLog"

  index({ uuid: 1 }, { unique: true, name: "uuid_index" })

  after_initialize :build_visitor

end
