class CreateColumns < ActiveRecord::Migration[5.1]
  def change
    create_table :columns do |t|

      t.string :title
      t.belongs_to :board

      t.timestamps
    end
  end
end
