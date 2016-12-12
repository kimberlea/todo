class TodoItem < ActiveRecord::Base
  include SchemaSync::Model

  field :title, type: String
  field :is_completed, type: :boolean, default: false

  field :list_id, type: Integer
  belongs_to :list, class_name: "TodoList", foreign_key: "list_id"

  validate do
    errors.add(:title, "Enter a title for this item.") if self.title.blank?
    errors.add(:title, "Item title is too short.") if self.title.present? && self.title.length < 3
    errors.add(:title, "Item title is too long.") if self.title.present? && self.title.length > 25
  end

  def view_path
    return "/items/#{id}"
  end

  def to_api
    ret = {}
    ret[:id] = self.id
    ret[:title] = self.title
    ret[:list_id] = self.list_id
    ret[:is_completed] = self.is_completed
    ret[:errors] = self.errors.to_hash if self.errors.any?
    return ret
  end

end
