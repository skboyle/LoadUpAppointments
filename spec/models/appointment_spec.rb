require 'rails_helper'

RSpec.describe Appointment, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      appointment = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 2
      )
      expect(appointment).to be_valid
    end

    it 'is not valid without a first name' do
      appointment = Appointment.new(first_name: nil)
      appointment.valid?
      expect(appointment.errors[:first_name]).to include("can't be blank")
    end

    it 'is not valid without a last name' do
      appointment = Appointment.new(last_name: nil)
      appointment.valid?
      expect(appointment.errors[:last_name]).to include("can't be blank")
    end

    it 'is not valid without a pet name' do
      appointment = Appointment.new(pet_name: nil)
      appointment.valid?
      expect(appointment.errors[:pet_name]).to include("can't be blank")
    end

    it 'is not valid without an animal type' do
      appointment = Appointment.new(animal_type: nil)
      appointment.valid?
      expect(appointment.errors[:animal_type]).to include("can't be blank")
    end

    it 'is not valid without a date of service' do
      appointment = Appointment.new(date_of_service: nil)
      appointment.valid?
      expect(appointment.errors[:date_of_service]).to include("can't be blank")
    end

    it 'is not valid without an appointment time' do
      appointment = Appointment.new(appointment_time: nil)
      appointment.valid?
      expect(appointment.errors[:appointment_time]).to include("can't be blank")
    end

    it 'is not valid without hours requested' do
      appointment = Appointment.new(hours_requested: nil)
      appointment.valid?
      expect(appointment.errors[:hours_requested]).to include("can't be blank")
    end

    it 'should validate date_of_service is not in the past' do
      appointment = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.new(Date.today.year - 1, Date.today.month, Date.today.day),
        appointment_time: Time.now,
        hours_requested: 2
      )
      appointment.valid?
      expect(appointment.errors[:date_of_service]).to include("can't be in the past")
    end
  end

  describe 'callbacks' do
    it 'should calculate the price before saving' do
      appointment = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 2
      )
      appointment.save
      expect(appointment.price).to eq(40)
    end

    it 'calculates the price for dogs correctly' do
      appointment = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 3
      )
      appointment.save
      expect(appointment.price).to eq(50) # 20 base + (3 * 10)
    end

    it 'calculates the price for cats correctly' do
      appointment = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Whiskers',
        animal_type: 'Cat',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 4
      )
      appointment.save
      expect(appointment.price).to eq(40) # 20 base + (4 * 5)
    end

    it 'calculates the price for mixed cases correctly' do
      appointment_dog = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 5
      )
      appointment_dog.save
      expect(appointment_dog.price).to eq(70) # 20 base + (5 * 10)

      appointment_cat = Appointment.new(
        first_name: 'Jane',
        last_name: 'Doe',
        pet_name: 'Whiskers',
        animal_type: 'Cat',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 6
      )
      appointment_cat.save
      expect(appointment_cat.price).to eq(50) # 20 base + (6 * 5)
    end
  end

  describe 'skip_date_validation' do
    it 'allows creation of past appointments when skip_date_validation is true' do
      appointment = Appointment.new(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.new(Date.today.year - 1, Date.today.month, Date.today.day),
        appointment_time: Time.now,
        hours_requested: 2,
        skip_date_validation: true
      )
      expect(appointment).to be_valid
    end
  end
end
