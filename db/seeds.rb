# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

###
client = Pclient.create

###
project = Project.create
project.pclient = client

###
project_action = ProjectAction.new({
  action_type: 'lightbox',
  action_detail: {
    css: {
      width: "500px",
      height: "300px",
      border: "1px solid black",
      background: "white"
    }
  },
  max_enters_per_session: 200,
  exit_condition: 'closed',
  callback_js: {
    before_enter: nil,
    after_enter: nil,
    before_close: nil,
    after_close: nil
  }
})
project.project_action = project_action

###
project_trigger1 = ProjectTrigger.new({
  match_type: 'url',
  match_detail: {
    relation: 'and',
    conditions: [
      { rule: 'contains', str: 'local:3000/registration' },
      { rule: 'does not contain', str: 'local:3000/registration/done' }
    ]
  }
})
project_trigger2 = ProjectTrigger.new({
  match_type: 'device_type',
  match_detail: {
    relation: 'or', 
    conditions: [
      { str: 'desktop' }
    ]
  }
})
project_trigger3 = ProjectTrigger.new({
  match_type: 'exit_intent',
  match_detail: {
    relation: 'and', 
    conditions: [
      { str: 'top' }
    ]
  }
})
project.project_triggers << project_trigger1
project.project_triggers << project_trigger2
project.project_triggers << project_trigger3

project.save
