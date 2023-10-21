import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Create a data object with the registration information
      const data = {
        username,
        password,
      };

      // Send a POST request to the /register route on your server
      const response = await axios.post('/api/auth/register', data);

      // Check the response for success
      if (response.status === 201) {
        console.log('Registration successful');
        // Optionally, you can redirect the user to the login page or show a success message.
      } else {
        console.log('Registration failed');
        // Handle registration failure, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle any network or server errors here.
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
