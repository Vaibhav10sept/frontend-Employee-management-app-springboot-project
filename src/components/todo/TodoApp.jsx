import { BrowserRouter,Routes, Route } from 'react-router-dom'
import React from 'react';
import Login from '../LoginComponent'
import Welcome from '../Welcome'
import './TodoApp.css'
import Error from '../ErrorComponent';
import ListTodo from '../ListTodo';
import Header from '../Header';
import Footer from '../Footer';
import Logout from '../Logout';
import AuthContext from '../security/AuthContext';
import Todo from '../Todo';
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
              <Route path="/todos" element={<ListTodo />} />
              <Route path="/todo/:id" element={<Todo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AuthContext>
      </div>
    );
}