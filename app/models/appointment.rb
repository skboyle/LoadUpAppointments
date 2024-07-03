class Appointment < ApplicationRecord
    attr_accessor :skip_date_validation # For seeding db with past appointments.
  
    validates :first_name, :last_name, :pet_name, :animal_type, :date_of_service, :appointment_time, :hours_requested, presence: true
    validate :date_of_service_cannot_be_in_the_past, unless: :skip_date_validation
  
    before_save :calculate_price
  
    def self.upcoming
      where('date_of_service >= ?', Date.today)
    end
  
    def date_of_service_cannot_be_in_the_past
      if date_of_service.present? && date_of_service < Date.today
        errors.add(:date_of_service, "can't be in the past")
      end
    end
  
    private
  
    def calculate_price
      rate = animal_type.downcase == 'dog' ? 10 : 5
      self.price = 20 + (rate * hours_requested)
    end
  end
  