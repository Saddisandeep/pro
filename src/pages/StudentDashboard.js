// src/pages/StudentDashboard.js
import { useState, useEffect } from 'react';
import API from '../services/api';

function StudentDashboard() {
  const [professors, setProfessors] = useState([]);
  const [professorId, setProfessorId] = useState('');
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchProfessors();
    fetchAppointments();
  }, []);

  const fetchProfessors = async () => {
    try {
      const res = await API.get('/auth/professors');
      setProfessors(res.data);
    } catch (error) {
      console.error('Error fetching professors', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/my');
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to fetch student appointments', err);
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await API.get(`/availability/${professorId}`);
      setSlots(res.data);
    } catch (error) {
      console.error('Error fetching availability', error);
      alert('Failed to fetch availability');
    }
  };

  const bookAppointment = async (date, time) => {
    try {
      await API.post('/appointments', { professorId, date, time });
      alert('Appointment booked!');
      fetchAppointments(); // Refresh appointment list
    } catch (error) {
      console.error('Error booking appointment', error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <select value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
        <option value="">Select a Professor</option>
        {professors.map(prof => (
          <option key={prof._id} value={prof._id}>
            {prof.username} (ID: {prof._id})
          </option>
        ))}
      </select>

      <button onClick={fetchAvailability} disabled={!professorId} style={{ marginLeft: '10px' }}>
        Fetch Availability
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Available Slots</h3>
        {slots.length > 0 ? (
          slots.map(slot => (
            <div key={slot._id}>
              <h4>{new Date(slot.date).toDateString()}</h4>
              {slot.timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => bookAppointment(slot.date, time)}
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                >
                  {time}
                </button>
              ))}
            </div>
          ))
        ) : (
          professorId && <p>No availability found.</p>
        )}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>My Booked Appointments</h3>
        <ul>
          {appointments.map(appt => (
            <li key={appt._id}>
              {new Date(appt.date).toLocaleDateString()} at {appt.time} with {appt.professorId?.username || 'Unknown'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;
