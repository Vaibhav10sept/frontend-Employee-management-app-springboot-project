import { useEffect, useState } from "react";
import { deleteEmployeeApi, deleteTodoApi, retrieveAllEmployees, retrieveAllTodosForUsername } from "./todo/Services/EmployeeApiService";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { deleteDepartmentApi, retrieveAllDepartments } from "./todo/Services/DepartmentApiService";

export default function ListDepartment() {
    const [departmentList, setDepartmentList] = useState([])
    useEffect(()=>refreshDepartments(),[])
    const navigate = useNavigate()

    function refreshDepartments() {
      console.log('inside refresh departments')
      retrieveAllDepartments()
        .then((response) => {
          setDepartmentList(response.data);
          console.log('fetch department',response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function deleteDepartment(id) {
      deleteDepartmentApi(id)
        .then((res) => {
          alert(`Deletion of department with ${id} is successfull`)
          refreshDepartments()
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function updateDepartment(id, departmentName, departmentDescription) {
      navigate(`/department/${id}`, { state: { departmentName, departmentDescription} });
    }


    return (
      <div className="container">
        <h2 className="text-center">List of all departments!</h2>

        <div class="row">
          <div class="col-2 mb-2">
            <input
              type="submit"
              value="Add Department"
              class="btn btn-primary float-left"
              onClick={() => navigate("/department/-1")}
            />
          </div>
 
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departmentList.map((ele) => {
              return (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.departmentName}</td>
                  <td>{ele.departmentDescription}</td>
                  <td>
                    <button
                      className="m-1 btn btn-warning"
                      onClick={() => deleteDepartment(ele.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="m-1 btn btn-success"
                      onClick={() =>
                        updateDepartment(
                          ele.id,
                          ele.departmentName,
                          ele.departmentDescription
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