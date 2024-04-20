import { useState } from "react";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function Login() {

  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('root');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(await auth.loginHandler(username, password)) {
      navigate('/welcome')
    }
    else {
      navigate('/login')
    }
  };
   
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
