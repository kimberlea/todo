### Generated by SchemaSync
class SchemaSyncQeogu < ActiveRecord::Migration
	def change
		create_table :todo_lists
		add_column :todo_lists, :title, :string
		add_column :todo_lists, :created_at, :datetime
		add_column :todo_lists, :updated_at, :datetime
	end
end