class Project
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia
  include AASM

  field :title, type: String
  field :status, type: String

  embeds_one :project_action, class_name: "ProjectAction"
  embeds_many :project_triggers, class_name: "ProjectTrigger"

  has_many :event_logs
  belongs_to :pclient, class_name: "Pclient"

  index({ pclient_id: 1 }, { unique: false, name: "pclient_id_index" })
  

  aasm column: 'status' do
    state :active, initial: true
    state :inactive

    event :activate do
      transitions from: :inactive, to: :active
    end

    event :inactivate do
      transitions from: :active, to: :inactive
    end
  end

  scope :active, -> { where(status: 'active') }
  

  def global_triggers
    project_triggers.where(:match_type.in => ProjectAction::GLOBAL_MATCH_TYPES)
  end


  def action_triggers
    project_triggers.where(:match_type.in => ProjectAction::ACTION_MATCH_TYPES)
  end

end
