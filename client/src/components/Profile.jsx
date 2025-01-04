import React, { useEffect, useState } from 'react';
import { getUser, resetPassword } from '../api/index'; // Adjust the path as necessary
import '../styles/profile.css'; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const res = await getUser(token);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordReset = async () => {
    const token = localStorage.getItem('authToken');
    //console.log(token)
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      await resetPassword(token, newPassword);
      setResetStatus('Password reset successfully');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
      <div className="password-reset">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="password-input"
        />
        <button onClick={handlePasswordReset} className="reset-button">Reset Password</button>
        {resetStatus && <p className="status">{resetStatus}</p>}
      </div>
    </div>
  );
};

export default Profile;


// import React, { useEffect, useState } from 'react';
// import { getUser } from '../api/index'; // Adjust the path as necessary

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         setError('No token found');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await getUser(token);
//         setUser(res.data);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Failed to fetch user');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Username: {user?.username}</p>
//       <p>Email: {user?.email}</p>
//     </div>
//   );
// };

// export default Profile;
