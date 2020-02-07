class ProjectSerializer < MongoidSerializer
  attributes :id, :title, :status, :pclient_id, :errors


  has_one :project_action
  has_many :project_triggers

end
