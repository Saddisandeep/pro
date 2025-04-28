// src/pages/StudentDashboard.js
import { useState, useEffect } from 'react';
import API from '../services/api';

function StudentDashboard() {
  const [professors, setProfessors] = useState([]);
  const [professorId, setProfessorId] = useState('');
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Fetch professors when component loads
    const fetchProfessors = async () => {
      try {
        const res = await API.get('/auth/professors');
        setProfessors(res.data);
      } catch (error) {
        console.error('Error fetching professors', error);
      }
    };

    fetchProfessors();
  }, []);

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
    </div>
  );
}

export default StudentDashboard;
