class ListsController < ApplicationController
  before_filter :authenticate_luna_user!

  before_filter :get_list, only: ['show', 'edit', 'destroy']

  def index
    @lists = List.where(owner: current_luna_user.id)
  end

  def show
    if params[:content]
      render partial: 'list'
    end
  end

  def new
    @list = List.new(params[:list])
    render layout: false
  end

  def edit
    render layout: false
  end

  def destroy
    @list.destroy
    redirect_to action: 'index'
  end

  private
  def get_list
    @list = List.where(owner: current_luna_user.id).find(params[:id])
  end

end

