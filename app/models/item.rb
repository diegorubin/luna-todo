class Item
  include Mongoid::Document

  field :position,    type: Fixnum
  field :description, type: String
  field :done,        type: Boolean, default: false

  embedded_in :list

end

