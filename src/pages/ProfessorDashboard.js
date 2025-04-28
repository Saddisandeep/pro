import { useState } from 'react';
import API from '../services/api';

function ProfessorDashboard() {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState('');

  const addAvailability = async () => {
    const slotsArray = timeSlots.split(',').map(t => t.trim());
    await API.post('/availability', { date, timeSlots: slotsArray });
    alert('Availability added!');
  };

  return (
    <div>
      <h2>Professor Dashboard</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input placeholder="Time Slots (comma separated)" onChange={(e) => setTimeSlots(e.target.value)} />
      <button onClick={addAvailability}>Add Availability</button>
    </div>
  );
}

export default ProfessorDashboard;