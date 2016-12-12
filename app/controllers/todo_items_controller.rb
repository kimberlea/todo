class TodoItemsController < ApplicationController
  before_action :load_item

  def index
    #load list id
    @items = TodoItems.all.order("is_completed ASC")
    render layout: do_show_layout
  end

  def show
    # get the list id
    list_id = params[:id]
    # find list by id
    @list = TodoList.find(list_id)
    # find items with matching list id
    @items = @list.todo_items
    render layout: do_show_layout
  end

  def save
    @item ||= TodoItem.new
    @item.is_completed ||= false

    @item.title = params[:title] if params.key?(:title)
    @item.list = TodoList.find(params[:list_id]) if params.key?(:list_id)
    @item.is_completed = params[:is_completed] == "true" if params.key?(:is_completed)
    saved = @item.save
    response = {success: saved, data: @item.to_api}
    render_result(response)
  end

  def delete
    @item.destroy
    response = {success: true, data: @item.to_api}
    render :json => response
  end

  private

  def load_item
    if params[:id].present?
      @item = TodoItem.find(params[:id])
    end
  end


end
