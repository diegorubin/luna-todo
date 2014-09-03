class Item
  include Mongoid::Document

  field :description, type: String
  field :done,        type: Boolean

  embedded_in :list

end
