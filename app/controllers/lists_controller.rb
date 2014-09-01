class ListsController < ApplicationController
  before_filter :authenticate_luna_user!

  def index
    @lists = List.where(owner: current_luna_user.id)
  end

end

