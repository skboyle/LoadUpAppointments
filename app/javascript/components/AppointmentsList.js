import React from 'react';
import PropTypes from 'prop-types';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTimeRange = (startTime, hoursRequested) => {
  const startHour = parseInt(startTime.split(':')[0]);
  const startMinutes = startTime.split(':')[1];
  const endHour = startHour + parseInt(hoursRequested);
  const formatTime = (hour, minutes) => {
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : String(hour % 12).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHour}:${minutes} ${period}`;
  };
  return `${formatTime(startHour, startMinutes)} - ${formatTime(endHour, startMinutes)}`;
};

const AppointmentsList = ({ appointments }) => {
  const today = new Date();
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.date_of_service) >= today);
  const pastAppointments = appointments.filter(appointment => new Date(appointment.date_of_service) < today).sort((a, b) => new Date(b.date_of_service) - new Date(a.date_of_service));

  const renderAppointments = (appointments, title) => (
    <div>
      <h2>{title}</h2>
      {appointments.length === 0 ? (
        <p>No {title.toLowerCase()} available.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th><strong>Actions</strong></th>
              <th><strong>First Name</strong></th>
              <th><strong>Last Name</strong></th>
              <th><strong>Pet Name</strong></th>
              <th><strong>Animal Type</strong></th>
              <th><strong>Hours Requested</strong></th>
              <th><strong>Price</strong></th>
              <th><strong>Appointment Time</strong></th>
              <th><strong>Date of Service</strong></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="right-align"><a href={`/appointments/${appointment.id}`}>Show</a></td>
                <td className="right-align">{appointment.first_name}</td>
                <td className="right-align">{appointment.last_name}</td>
                <td className="right-align">{appointment.pet_name}</td>
                <td className="right-align">{appointment.animal_type}</td>
                <td className="right-align">{appointment.hours_requested}</td>
                <td className="right-align">${parseFloat(appointment.price).toFixed(2)}</td>
                <td className="right-align">{formatTimeRange(appointment.appointment_time, appointment.hours_requested)}</td>
                <td className="right-align">{formatDate(appointment.date_of_service)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="container">
      <h1>Appointments</h1>
      {renderAppointments(upcomingAppointments, 'Upcoming Appointments')}
      {renderAppointments(pastAppointments, 'Past Appointments')}
    </div>
  );
};

AppointmentsList.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      pet_name: PropTypes.string.isRequired,
      animal_type: PropTypes.string.isRequired,
      date_of_service: PropTypes.string.isRequired,
      appointment_time: PropTypes.string.isRequired,
      hours_requested: PropTypes.number.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
};

export default AppointmentsList;
