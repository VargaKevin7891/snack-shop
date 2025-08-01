import { useState } from 'react';

export default function Profile( {userData} ) {
  const [user, setUser] = useState(userData);

  if (!user) return <p style={{ color: 'crimson' }}>Unauthorised</p>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>Profile</h2>
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </div>
  );
}
