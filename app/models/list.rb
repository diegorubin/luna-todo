class List
  include Mongoid::Document

  field :title, type: String
  field :owner, type: Fixnum

  embeds_many :items

  accepts_nested_attributes_for :items, allow_destroy: true, 
    reject_if: proc { |attributes| attributes['description'].blank? }

  # Validates
  validates_presence_of :title, :owner

  def todo_items
    @todo_items ||= items.where(done: false).order('position ASC')
  end

  def done_items
    @done_items ||= items.where(done: true).order('description ASC')
  end

end

