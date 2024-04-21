import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import React from 'react';

export default function Welcome() {
    const auth = useAuth();

    return (
      <>
        <h1>Welcome {auth.username}</h1>
        <div>
          Your todos <Link to="/employees">Go here</Link>
        </div>
      </> 
    );
}