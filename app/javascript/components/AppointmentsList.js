import React from 'react';
import PropTypes from 'prop-types';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Pet Name</th>
              <th>Animal Type</th>
              <th>Date of Service</th>
              <th>Appointment Time</th>
              <th>Hours Requested</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.first_name}</td>
                <td>{appointment.last_name}</td>
                <td>{appointment.pet_name}</td>
                <td>{appointment.animal_type}</td>
                <td>{formatDate(appointment.date_of_service)}</td>
                <td>{formatTime(appointment.appointment_time)}</td>
                <td>{appointment.hours_requested}</td>
                <td>${parseFloat(appointment.price).toFixed(2)}</td>
                <td>
                  <a href={`/appointments/${appointment.id}`}>Show</a>
                </td>
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
