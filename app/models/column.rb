class Column < ApplicationRecord
  belongs_to :board
  has_many :tasks
  default_scope { order(created_at: :asc) }
end
