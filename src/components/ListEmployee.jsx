import { useEffect, useState } from "react";
import { deleteEmployeeApi, deleteTodoApi, retrieveAllEmployees, retrieveAllTodosForUsername } from "./todo/Services/EmployeeApiService";
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function ListEmployee() {
    const [employeeList, setEmployeeList] = useState([])
    useEffect(()=>refreshEmployees(),[])
    const navigate = useNavigate()

    function refreshEmployees() {
      retrieveAllEmployees()
        .then((response) => {
          setEmployeeList(response.data);
          console.log('fetch employee',response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function deleteTodo(id) {
        deleteEmployeeApi(id)
        .then((res) => {
          alert(`Deletion of employee with ${id} is successfull`)
          refreshEmployees()
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function updateTodo(id, firstName, lastName, email, departmentId) {
      navigate(`/employee/${id}`, { state: { firstName, lastName, email, departmentId} });
    }


    return (
      <div className="container">
        <h2 className="text-center">List of all employees!</h2>

        <div class="row">
          <div class="col-2 mb-2">
            <input
              type="submit"
              value="Add Employee"
              class="btn btn-primary float-left"
              onClick={() => navigate("/employee/-1")}
            />
          </div>
 
        </div>

        {/* <button
          className="btn btn-primary mb-5 margin-left"
          onClick={() => navigate("/employee/-1")}
        >
          Add New Employee
        </button> */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((ele) => {
              return (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.firstName}</td>
                  <td>{ele.lastName}</td>
                  <td>{ele.email}</td>
                  <td>
                    <button
                      className="m-1 btn btn-warning"
                      onClick={() => deleteTodo(ele.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="m-1 btn btn-success"
                      onClick={() =>
                        updateTodo(
                          ele.id,
                          ele.firstName,
                          ele.lastName,
                          ele.email,
                          ele.departmentId
                        )
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}