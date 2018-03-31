class Board < ApplicationRecord
  has_many :columns
  before_save :create_link

  private
  def create_link
    self.link= rand(36**8).to_s(36)
  end


end
