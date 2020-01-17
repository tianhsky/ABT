class ProjectTrigger
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :match_type, type: String
  field :match_detail, type: Hash

  embedded_in :project, class_name: "Project"

  before_validation :ensure_id

  def ensure_id
    if self.id.blank?
      self.id = BSON::ObjectId.new
    end
  end
  
end