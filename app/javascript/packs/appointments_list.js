import React from 'react';
import { render } from 'react-dom';
import AppointmentsList from '../components/AppointmentsList';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('appointments-list');
  if (node) {
    const dataAttr = node.getAttribute('data-appointments');
    console.log('data-appointments:', dataAttr);
    try {
      const data = JSON.parse(dataAttr);
      render(<AppointmentsList appointments={data} />, node);
    } catch (e) {
      console.error('Failed to parse appointments data:', e);
    }
  }
});

