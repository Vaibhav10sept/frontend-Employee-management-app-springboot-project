import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createEmployeeApi, updateEmployeeApi } from "./todo/Services/EmployeeApiService";
import React from 'react';
import { fireEvent } from "@testing-library/react";
import * as Yup from 'yup';
import { createDepartmentApi, updateDepartmentApi } from "./todo/Services/DepartmentApiService";



export default function Department() {
  const {state} = useLocation();
  const {id} = useParams()
  const navigate = useNavigate()

  function onSubmit(values) {
    console.log("id "+ id)
    if(id == -1) {
      //means you have are creating a new department
      const department = {
        departmentName: values.departmentName,
        departmentDescription: values.departmentDescription,
        email: values.email,
      }
      console.log('creating department' + department)
      createDepartmentApi(department)
      .then((res) => {
        navigate("/departments");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else { //id === -1, means some id is passed that means you're updating a already existing department
      const department = {
        id: id,
        departmentName: values.departmentName,
        departmentDescription: values.departmentDescription,
      }
      console.log('updating department' , department)
      updateDepartmentApi(id, department)
      .then((res) => {
        navigate("/departments");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  function onValidate(values) {
    let error = {}
    if (values.departmentName.length === 0) {
      error.departmentName = "department name is required!";
    }
    if (values.departmentDescription.length === 0) {
      error.departmentDescription = "description is required!";
    }

    return error
  }

    return (
      <div className="container mt-4">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {id == -1 ? (
            <h4 className="text-center">Add Department</h4>
          ) : (
            <h4 className="text-center">Update Department</h4>
          )}
          <div className="card-body">
            <Formik
              initialValues={{
                departmentName: state !== null ? state.departmentName : "",
                departmentDescription:
                  state !== null ? state.departmentDescription : "",
              }}
              onSubmit={onSubmit}
              validate={onValidate}
              validateOnChange={false}
              validateOnBlur={false}
            >
              <Form>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="departmentName">
                    Department Name:
                  </label>
                  {/* <div class="col-sm-10"> */}
                  <Field
                    type="text"
                    name="departmentName"
                    className="form-control"
                    placeholder="Enter your department name"
                  />
                  {/* </div> */}
                  <ErrorMessage
                    name="departmentName"
                    component="div"
                    className="alert alert-warning m-2"
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="departmentDescription">
                    Description:
                  </label>
                  {/* <div class="col-sm-10"> */}
                  <Field
                    type="text"
                    name="departmentDescription"
                    className="form-control"
                    placeholder="Enter your description"
                  />
                  {/* </div> */}
                  <ErrorMessage
                    name="departmentDescription"
                    component="div"
                    className="alert alert-warning m-2"
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </Form>

              {/* <button type="submit" className="btn btn-success">
                  Save
                </button>
              </Form> */}
            </Formik>
          </div>
        </div>
      </div>
    );
}