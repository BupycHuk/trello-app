FactoryBot.define do
  factory :board do
    sequence(:title) { |n| "Title #{n}" }
    link { o = ('a'..'z').to_a
      (0...25).map { o[rand(o.length)] }.join
    }
  end

end