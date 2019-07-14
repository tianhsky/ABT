class Visitor
  include Mongoid::Document

  field :customer_uid, type: String
  
  embedded_in :visitor_session, class_name: "VisitorSession"

end
