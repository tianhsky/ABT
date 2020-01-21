class ProjectService

  def self.clientProjectsJson(pclient:nil, status:'active')

    projects = pclient.projects.send(status)

    r = {
      config: {
        host: "#{ENV['APP_HOST']}"
      },
      client: {
        id: pclient.id.to_s,
        projects: projects.map do |p|
          p_action = p.project_action
          {
            id: p.id.to_s,
            title: p.title,
            status: p.status,
            triggers: {
              global: p.global_triggers.map do |t|
                {
                  id: t.id.to_s,
                  match_type: t.match_type,
                  match_detail: t.match_detail
                }
              end,
              action: p.action_triggers.map do |t|
                {
                  id: t.id.to_s,
                  match_type: t.match_type,
                  match_detail: t.match_detail
                }
              end,
            },
            action: {
              id: p_action.id.to_s,
              action_type: p_action.action_type,
              action_detail: p_action.action_detail,
              max_enters_per_session: p_action.max_enters_per_session,
              exit_condition: p_action.exit_condition,
              callback_js: p_action.callback_js
            }
          }
        end
      }
    }

    r
  end

end