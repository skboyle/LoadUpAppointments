import React, { useState, useEffect } from "react";
import axios from 'axios';

const AppointmentForm = () => {
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    pet_name: '',
    animal_type: 'Dog',
    notes: '',
    date_of_service: getTomorrowDate(),
    appointment_time: '08:00',
    hours_requested: 2,
  });

  useEffect(() => {
    calculatePrice();
  }, [formData.animal_type, formData.hours_requested]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculatePrice = () => {
    const rate = formData.animal_type.toLowerCase() === 'dog' ? 10 : 5;
    const price = 20 + (rate * formData.hours_requested);
    setFormData({
      ...formData,
      price: price
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/appointments', { appointment: formData }, {
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      }
    })
    .then(response => {
      if (response.data.success) {
        // Redirect to the appointment show page
        window.location.href = `/appointments/${response.data.appointment.id}`;
      } else {
        const errorMessage = response.data.errors ? response.data.errors.join(", ") : "There was an error creating the appointment.";
        alert(errorMessage);
      }
    })
    .catch(error => {
      console.error('There was an error creating the appointment!', error);
      alert("There was an error creating the appointment.");
    });
  };

  return (
    <div className="container">
      <h2>Appointment Scheduler</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input 
            type="text" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            placeholder="Enter your first name" 
          />
        </label>
        <label>
          Last Name:
          <input 
            type="text" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            placeholder="Enter your last name" 
          />
        </label>
        <label>
          Pet Name:
          <input 
            type="text" 
            name="pet_name" 
            value={formData.pet_name} 
            onChange={handleChange} 
            placeholder="Enter your pet's name" 
          />
        </label>
        <label>
          Animal Type:
          <select name="animal_type" value={formData.animal_type} onChange={handleChange}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </label>
        <label>
          Notes:
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            placeholder="Enter any notes or special instructions" 
          />
        </label>
        <label>
          Date of Service:
          <input 
            type="date" 
            name="date_of_service" 
            value={formData.date_of_service} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Appointment Time:
          <select name="appointment_time" value={formData.appointment_time} onChange={handleChange}>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                {`${i === 0 ? 12 : i % 12}:00 ${i < 12 ? 'AM' : 'PM'}`}
              </option>
            ))}
          </select>
        </label>
        <label>
          Hours Requested:
          <select name="hours_requested" value={formData.hours_requested} onChange={handleChange}>
            {[...Array(7).keys()].map(i => <option key={i} value={i + 2}>{i + 2}</option>)}
          </select>
        </label>
        <p>Price: ${formData.price}</p>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
