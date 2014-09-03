class List
  include Mongoid::Document

  field :title, type: String
  field :owner, type: Fixnum

  embeds_many :items
  recursively_embeds_many 

  # Validates
  validates_presence_of :title, :owner

end

