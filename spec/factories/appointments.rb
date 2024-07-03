FactoryBot.define do
    factory :appointment do
      first_name { 'John' }
      last_name { 'Doe' }
      pet_name { 'Buddy' }
      animal_type { 'Dog' }
      notes { 'No special instructions' }
      date_of_service { Date.tomorrow }
      appointment_time { Time.now }
      hours_requested { 2 }
      price { 40 }
    end
  end
  