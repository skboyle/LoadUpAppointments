require 'rails_helper'

RSpec.describe Admin::AppointmentsController, type: :controller do
  before do
    @request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Basic.encode_credentials('admin', 'password')
  end

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it 'assigns @appointments' do
      appointment = Appointment.create!(
        first_name: 'John',
        last_name: 'Doe',
        pet_name: 'Buddy',
        animal_type: 'Dog',
        date_of_service: Date.tomorrow,
        appointment_time: Time.now,
        hours_requested: 2,
        price: 40
      )
      get :index
      expect(assigns(:appointments)).to eq([appointment])
    end
  end
end
