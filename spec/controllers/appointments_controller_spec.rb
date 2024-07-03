require 'rails_helper'

RSpec.describe AppointmentsController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a new appointment' do
        expect {
          post :create, params: { appointment: attributes_for(:appointment) }
        }.to change(Appointment, :count).by(1)
      end

      it 'returns a successful response' do
        post :create, params: { appointment: attributes_for(:appointment) }
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new appointment' do
        expect {
          post :create, params: { appointment: attributes_for(:appointment, first_name: nil) }
        }.to_not change(Appointment, :count)
      end

      it 'returns an unprocessable entity response' do
        post :create, params: { appointment: attributes_for(:appointment, first_name: nil) }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end

