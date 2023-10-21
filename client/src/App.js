import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <Link to="/register">Register</Link>
      <Route path="/register" Component={Register} />
        
    </Router>
  );
}

export default App;
