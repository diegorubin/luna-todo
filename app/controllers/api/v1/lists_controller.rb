class Api::V1::ListsController < ApiController
  before_filter :authenticate_luna_user!

  def index
    lists = List.where(owner: current_luna_user.id)
    render json: {status: 'ok', lists: lists}
  end

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
    @list = List.where(owner: current_luna_user.id).find(params[:id])

    respond_to do |format|

      format.json do 
        if @list.update(list_params)
          render json: {status: 'ok', list: @list}
        else
          render json: {status: 'error', list: @list, errors: @list.errors}
        end
      end

      format.html do
        if @list.update(list_params)
          render partial: 'lists/list'
        else
          render text: ''
        end
      end
    end
  end

  private
  def list_params
    params.require(:list).permit(:title, :items_attributes => ['description', 'done', 'id', 'position', '_destroy'])
  end

end

