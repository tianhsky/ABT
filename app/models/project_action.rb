class ProjectAction
  include Mongoid::Document
  include Mongoid::Timestamps
  
  GLOBAL_MATCH_TYPES = ['url', 'device_type']
  ACTION_MATCH_TYPES = ['exit_intent']

  field :action_type, type: String
  field :action_detail, type: Hash
  field :max_enters_per_session, type: Integer
  field :exit_condition, type: String
  field :callback_js, type: Hash

  embedded_in :project, class_name: "Project"
  
end
