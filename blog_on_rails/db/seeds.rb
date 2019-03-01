# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all # clear all data before 
Comment.destroy_all
User.destroy_all

PASSWORD = "supersecret"

30.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    User.create(
      first_name: first_name,
      last_name: last_name,
      email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
      password: PASSWORD,
      is_admin?: false
    )
  end
  
  users = User.all

100.times do
created_at = Faker::Date.backward(365 * 5)
q =  Post.create(
title: Faker::Cannabis.strain,
body: Faker::Hipster.paragraphs,
created_at: created_at,
updated_at: created_at,
user: users.sample
)

if q.valid?
        q.comments = rand(0..15).times.map do
        Comment.new(body: Faker::GreekPhilosophers.quote, user: users.sample)
        end
    end
end
