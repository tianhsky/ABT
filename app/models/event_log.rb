class EventLog
  include Mongoid::Document
  include Mongoid::Timestamps

  embeds_one :browser_info, class_name: "BrowserInfo"
  embeds_one :action_info, class_name: "ActionInfo"
  accepts_nested_attributes_for :browser_info, :action_info

  belongs_to :pclient, class_name: "Pclient"
  belongs_to :project, class_name: "Project"
  belongs_to :visitor_session, class_name: "VisitorSession"

  index({ pclient_id: 1 }, { unique: false, name: "pclient_id_index" })
  index({ project_id: 1 }, { unique: false, name: "project_id_index" })
  index({ visitor_session_id: 1 }, { unique: false, name: "visitor_session_id_index" })


  before_validation :setup_pclient

  def setup_pclient
    self.pclient = project.try(:pclient)
  end

end
