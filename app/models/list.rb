class List
  include Mongoid::Document

  field :title, type: String
  field :owner, type: String

  recursively_embeds_many 

  # Validates
  validates_presence_of :title, :owner

end

