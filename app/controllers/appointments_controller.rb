class AppointmentsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @appointments = Appointment.all
    end

    def new
      @appointment = Appointment.new
    end
  
    def create
      @appointment = Appointment.new(appointment_params)
      if @appointment.save
        render json: { success: true, appointment: @appointment }, status: :created
      else
        Rails.logger.debug @appointment.errors.full_messages
        render json: { success: false, errors: @appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      @appointment = Appointment.find(params[:id])
    end

    private
  
    def appointment_params
      params.require(:appointment).permit(:first_name, :last_name, :pet_name, :animal_type, :notes, :date_of_service, :appointment_time, :hours_requested, :price)
    end
  end