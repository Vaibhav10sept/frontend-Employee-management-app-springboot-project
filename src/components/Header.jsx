import { Link } from 'react-router-dom';
import './header.css'
import { useAuth } from './security/AuthContext';
import React from 'react';

export default function Header() {
  const auth = useAuth()
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a
            className="navbar-brand"
            href="https://vaibhav-tiwari-portfolio.web.app/"
            target="_blank"
          >
            Your Website
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {auth.isAuthenticated && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todos">
                    Todos
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div id="navbarNav">
            <ul className="navbar-nav">
              {auth.isAuthenticated ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={() => auth.logout()}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}