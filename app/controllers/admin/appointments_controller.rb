module Admin
  class AppointmentsController < ApplicationController
    before_action :authenticate

    def index
      @appointments = Appointment.all
    end

    private

    def authenticate
      authenticate_or_request_with_http_basic do |username, password|
        username == 'admin' && password == 'password'
      end
    end
  end
end
