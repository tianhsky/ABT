class ProjectSerializer < MongoidSerializer
  attributes :id, :title, :status


  has_one :project_action
  has_many :project_triggers

end
