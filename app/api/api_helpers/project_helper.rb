module APIHelpers
  module ProjectHelper
    
    def get_project
      id = params[:project_id]
      @project = Project.find(id)
    end


    def project_params
      project = params[:project]

      begin
        project[:project_triggers].each do |t|
          t[:id] = nil if t[:id].include?("temp-")
        end
      rescue
      end

      strong_params.require(:project).permit(
        :id, :title, :status,
        :project_action => [
          :id, :action_type, :exit_condition, :max_enters_per_session,
          :action_detail => [:css, :html],
          :callback_js => [
            :before_enter, 
            :after_enter,
            :before_close,
            :after_close
          ]
        ],
        :project_triggers => [
          :id, :match_type, 
          :match_detail => [
            :relation,
            :conditions => [
              :rule, :str
            ]
          ]
        ]
      )

      project
    end

    def save_project
      project_id = params[:project][:id]
      if project_id.blank?
        @project = Project.new
      else
        @project = Project.find(project_id)
      end
      @project.assign_attributes(project_params)
      @project.save
    end

  end
end