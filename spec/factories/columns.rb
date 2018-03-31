FactoryBot.define do
  factory :column do
    sequence(:title) { |n| "Column #{n}" }
    board
  end

end