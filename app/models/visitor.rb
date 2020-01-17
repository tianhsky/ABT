class Visitor
  include Mongoid::Document

  field :abt_uid, type: String
  field :customer_uid, type: String
  
  embedded_in :visitor_session, class_name: "VisitorSession"

end
