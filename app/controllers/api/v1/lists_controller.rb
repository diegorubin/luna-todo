class Api::V1::ListsController < ApiController
  before_filter :authenticate_luna_user!

  def create
    list = List.new(list_params)
    list.owner = current_luna_user.id
    if list.save
      render json: {status: 'ok', list: list}
    else
      render json: {status: 'error', list: list, errors: list.errors}
    end
  end

  def update
    list = List.where(owner: current_luna_user.id).find(params[:id])
    if list.update(list_params)
      render json: {status: 'ok', list: list}
    else
      render json: {status: 'error', list: list, errors: list.errors}
    end
  end

  private
  def list_params
    params.require(:list).permit(:title)
  end

end

