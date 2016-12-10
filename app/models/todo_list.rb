class TodoList < ActiveRecord::Base
  include SchemaSync::Model

  field :title, type: String

  has_many :todo_items, foreign_key: :list_id, class_name: "TodoItem"

  timestamps!

  def view_path
    return "/lists/#{id}"
  end

  def to_api
    ret = {}
    ret[:id] = self.id.to_s
    ret[:title] = self.title
    ret[:created_at] = self.created_at.to_i
    return ret
  end

end
