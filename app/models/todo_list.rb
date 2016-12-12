class TodoList < ActiveRecord::Base
  include SchemaSync::Model

  field :title, type: String

  has_many :todo_items, foreign_key: :list_id, class_name: "TodoItem"

  timestamps!

  validate do
    errors.add(:title, "Please enter a title for this list.") if self.title.blank?
    errors.add(:title, "This title is too short.") if self.title.present? && self.title.length < 2
    errors.add(:title, "This title is too long.") if self.title.present? && self.title.length > 100
  end

  def view_path
    return "/lists/#{id}"
  end

  def to_api
    ret = {}
    ret[:id] = self.id.to_s
    ret[:title] = self.title
    ret[:created_at] = self.created_at.to_i
    ret[:errors] = self.errors.to_hash if self.errors.any?
    return ret
  end

end
