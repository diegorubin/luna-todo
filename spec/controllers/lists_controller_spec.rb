require 'spec_helper'

describe ListsController do

  context 'on list lists' do
    it 'get lists' do
      get :index
      expect(assigns(:lists)).to be_kind_of(Array)
    end
  end

end

