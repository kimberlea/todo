### Generated by SchemaSync
class SchemaSyncZvret < ActiveRecord::Migration
	def change
		create_table :todo_items
		add_column :todo_items, :title, :string
		add_column :todo_items, :is_completed, :boolean
		add_column :todo_items, :list_id, :integer
	end
end