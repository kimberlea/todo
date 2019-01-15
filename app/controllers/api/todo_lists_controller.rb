class Api::TodoListsController < ApplicationController

  before_action :load_list

  def index
    lists = TodoList.all.order(:title)
    res = {success: true, data: lists.collect(&:to_api)}
    render_result(res)
  end

  def save
    @list ||= TodoList.new
    @list.title = params[:title]
    saved = @list.save
    res = {success: saved, data: @list.to_api}
    render_result(res)
  end

  def delete
    id = params[:id]
    @list = TodoList.find(id)
    if @list.nil?
      render_result({success: false, error: "List not found."})
      return
    end
    @list.destroy
    res = {success: true, data: @list.to_api}
    render_result(res)
  end

  private

  def load_list
    if params[:id].present?
      @list = TodoList.find(params[:id])
    end
  end
end
