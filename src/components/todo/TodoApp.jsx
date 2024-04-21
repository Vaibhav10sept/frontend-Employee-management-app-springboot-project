import { BrowserRouter,Routes, Route } from 'react-router-dom'
import React from 'react';
import Login from '../LoginComponent'
import Welcome from '../Welcome'
import './TodoApp.css'
import Error from '../ErrorComponent';
import Header from '../Header';
import Footer from '../Footer';
import Logout from '../Logout';
import AuthContext from '../security/AuthContext';
import Todo from '../Employee';
import ListEmployee from '../ListEmployee';
import Employee from '../Employee';
import ListDepartment from '../ListDepartment';
import Department from '../Department';
export default function TodoApp() {
    return (
      <div className="TodoApp">
        <AuthContext>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/employees" element={<ListEmployee />} />
              <Route path="/departments" element={<ListDepartment />} />
              <Route path="/employee/:id" element={<Employee />} />
              <Route path="/department/:id" element={<Department />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AuthContext>
      </div>
    );
}