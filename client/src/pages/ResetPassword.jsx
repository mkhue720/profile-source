import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { id, token } = useParams();
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/ResetPassword/${id}/${token}`, { password });
      if (response.status === 200) {
        alert('Password updated successfully.');
      } else {
        setError(response.data.message); 
      }
    } catch (error) {
      console.error(error);
      setError('Failed to connect to the server.'); 
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
      <form onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;
