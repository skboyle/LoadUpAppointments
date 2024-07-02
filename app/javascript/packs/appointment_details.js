import React from 'react';
import { render } from 'react-dom';
import AppointmentDetails from '../components/AppointmentDetails';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('appointment-details');
  if (node) {
    const dataAttr = node.getAttribute('data-appointment');
    console.log('data-appointment:', dataAttr);
    try {
      const data = JSON.parse(dataAttr);
      render(<AppointmentDetails appointment={data} />, node);
    } catch (e) {
      console.error('Failed to parse appointment data:', e);
    }
  }
});
