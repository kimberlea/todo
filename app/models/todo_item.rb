class TodoItem < ActiveRecord::Base
  include SchemaSync::Model

  field :title, type: String
  field :is_completed, type: :boolean, default: false

  field :list_id, type: Integer
  belongs_to :list, class_name: "TodoList", foreign_key: "list_id"

  def to_api
    ret = {}
    ret[:id] = self.id
    ret[:title] = self.title
    ret[:list_id] = self.list_id
    ret[:is_completed] = self.is_completed
    return ret
  end

end
