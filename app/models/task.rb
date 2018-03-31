class Task < ApplicationRecord
  belongs_to :column
  default_scope { order(created_at: :asc) }
end
