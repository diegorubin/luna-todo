class Api::V1::ListsController < ApiController
  before_filter :authenticate_luna_user!

  def create
    list = List.new(params[:list])
    if list.save
      render json: {status: 'ok', list: list}
    else
      render json: {status: 'error', list: list, errors: list.errors}
    end
  end

  def update
    list = List.where(owner: current_luna_user.id).find(params[:id])
    if list.save
      render json: {status: 'ok', list: list}
    else
      render json: {status: 'error', list: list, errors: list.errors}
    end
  end

end

