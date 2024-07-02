class CreateAppointments < ActiveRecord::Migration[7.1]
  def change
    create_table :appointments do |t|
      t.string :first_name
      t.string :last_name
      t.string :pet_name
      t.string :animal_type
      t.text :notes
      t.date :date_of_service
      t.time :appointment_time
      t.integer :hours_requested
      t.decimal :price

      t.timestamps
    end
  end
end
