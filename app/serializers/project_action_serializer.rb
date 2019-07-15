class ProjectActionSerializer < MongoidSerializer
  attributes :id, :action_type, :action_detail, :max_enters_per_session, :exit_condition, :callback_js


end
