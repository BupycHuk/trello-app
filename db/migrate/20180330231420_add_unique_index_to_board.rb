class AddUniqueIndexToBoard < ActiveRecord::Migration[5.1]
  def change
    add_index :boards, :link, :unique => true
  end
end
