class TodoListsController < ApplicationController

  before_action :load_list

  def index
    @lists = TodoList.all.order(:title)
  end

  def show
    # get the list id
    list_id = params[:id]
    filter = params[:filter]
    # find the list by the id
    @list = TodoList.find(list_id)
    # get the items for that list
    @items = @list.todo_items.order("is_completed ASC, title ASC")
    if filter
      @items = @items.select{|item| item.title.start_with?(filter)}
    end
  end

  def edit
  # button next to delete button(pencil)
   #when clicked it should hide the title of list and show a text box
  end

  def save
    @list ||= TodoList.new
    @list.title = params[:title]
    saved = @list.save
    response = {success: saved, data: @list.to_api}
    render :json => response
  end

  def delete
    @list.destroy
    response = {success: true, data: @list.to_api}
    render :json => response
  end

  private

  def load_list
    if params[:id].present?
      @list = TodoList.find(params[:id])
    end
  end

end
