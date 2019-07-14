class ProjectTrigger
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :match_type, type: String
  field :match_detail, type: Hash

  embedded_in :project, class_name: "Project"
  
end