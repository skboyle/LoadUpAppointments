import React from 'react';

const formatTimeRange = (startTime, hoursRequested) => {
  const startHour = new Date(startTime).getHours();
  const endHour = startHour + parseInt(hoursRequested, 10);
  const formatTime = hour => {
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };
  return `${formatTime(startHour)} to ${formatTime(endHour)}`;
};

const AppointmentDetails = ({ appointment }) => {
  const price = parseFloat(appointment.price);
  return (
    <div className="container">
      <h1>Appointment Details</h1>
      <p><strong>First Name:</strong> {appointment.first_name}</p>
      <p><strong>Last Name:</strong> {appointment.last_name}</p>
      <p><strong>Pet Name:</strong> {appointment.pet_name}</p>
      <p><strong>Animal Type:</strong> {appointment.animal_type}</p>
      <p><strong>Notes:</strong> {appointment.notes}</p>
      <p><strong>Date of Service:</strong> {new Date(appointment.date_of_service).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {formatTimeRange(appointment.appointment_time, appointment.hours_requested)}</p>
      <p><strong>Price:</strong> ${price.toFixed(2)}</p>
      <p>Thank you for using Pet Sitter!</p>
    </div>
  );
};

export default AppointmentDetails;
