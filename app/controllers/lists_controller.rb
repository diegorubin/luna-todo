class ListsController < ApplicationController

  def index
    @lists = List.where(owner: current_luna_user.id)
  end

end

