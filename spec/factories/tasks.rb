FactoryBot.define do
  factory :task do
    sequence(:title) { |n| "Task #{n}" }
    column
  end
end
