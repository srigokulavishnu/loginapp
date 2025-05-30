import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return setLoading(false);
    const userObj = JSON.parse(userData);
    if (!userObj.email) return setLoading(false);

    fetch(`${BACKEND_URL}/account?email=${encodeURIComponent(userObj.email)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching user data');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Please login first.</p>;

  const photoUrl = user.photo ? `${BACKEND_URL}/uploads/${user.photo}` : '/default-profile.png';

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 12 }}>
      <div style={{ textAlign: 'center' }}>
        <img src={photoUrl} alt="Profile" style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }} onError={e => e.target.src = '/default-profile.png'} />
        <h2>{user.name}</h2>
        <p style={{ color: '#888' }}>@{user.email.split('@')[0]}</p>
      </div>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Gender:</strong> {user.gender?.[0].toUpperCase() + user.gender?.slice(1)}</p>
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <button onClick={handleLogout} style={{ backgroundColor: '#ff5a5f', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: 8 }}>Logout</button>
      </div>
    </div>
  );
}

export default Account;