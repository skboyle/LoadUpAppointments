# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'faker'

Appointment.destroy_all

today = Date.today
base_time = Time.now.change(hour: 8, min: 0, sec: 0)

# Generate 4 past appointments
4.times do |i|
  past_date = today - (i + 1) * 7 # Generate dates 7, 14, 21, 28 days in the past
  appointment_time = base_time - (i + 1).hours
  animal_type = i.even? ? 'Dog' : 'Cat'
  hours_requested = rand(2..8)
  rate = animal_type == 'Dog' ? 10 : 5
  price = 20 + rate * hours_requested

  Appointment.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    pet_name: Faker::Creature::Dog.name,
    animal_type: animal_type,
    notes: "Past notes #{i + 1}",
    date_of_service: past_date,
    appointment_time: appointment_time,
    hours_requested: hours_requested,
    price: price,
    skip_date_validation: true # Skip validation for past appointments
  )
end

# Generate 6 upcoming appointments
6.times do |i|
  future_date = today + (i + 1) * 7 # Generate dates 7, 14, 21, 28, 35, 42 days in the future
  appointment_time = base_time + (i + 1).hours
  animal_type = i.even? ? 'Dog' : 'Cat'
  hours_requested = rand(2..8)
  rate = animal_type == 'Dog' ? 10 : 5
  price = 20 + rate * hours_requested

  Appointment.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    pet_name: Faker::Creature::Dog.name,
    animal_type: animal_type,
    notes: "Future notes #{i + 1}",
    date_of_service: future_date,
    appointment_time: appointment_time,
    hours_requested: hours_requested,
    price: price
  )
end

puts "Seeded 4 past and 6 upcoming appointments."
