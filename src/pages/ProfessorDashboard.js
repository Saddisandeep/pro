// src/pages/ProfessorDashboard.js
import { useState, useEffect } from 'react';
import API from '../services/api';

function ProfessorDashboard() {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState('');
  const [appointments, setAppointments] = useState([]);

  const addAvailability = async () => {
    const slotsArray = timeSlots.split(',').map(t => t.trim());
    await API.post('/availability', { date, timeSlots: slotsArray });
    alert('Availability added!');
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/professor/my');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments', err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      alert('Appointment cancelled');
      fetchAppointments(); // refresh professor’s list
    } catch (err) {
      console.error('Error cancelling appointment', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Professor Dashboard</h2>

      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input
        placeholder="Time Slots (comma separated, e.g., 10:00, 11:00)"
        onChange={(e) => setTimeSlots(e.target.value)}
      />
      <button onClick={addAvailability}>Add Availability</button>

      <h3>Booked Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {new Date(appt.date).toLocaleDateString()} at {appt.time} - Student: {appt.studentId?.username || 'Unknown'}
            <button onClick={() => cancelAppointment(appt._id)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfessorDashboard;
