import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createEmployeeApi, updateEmployeeApi } from "./todo/Services/EmployeeApiService";
import React from 'react';
import { fireEvent } from "@testing-library/react";
import * as Yup from 'yup';
import { retrieveAllDepartments } from "./todo/Services/DepartmentApiService";



export default function Employee() {
  const {state} = useLocation();
  const {id} = useParams()
  const navigate = useNavigate()
  const [departmentList, setDepartmentList] = useState([])

  useEffect(()=> {
    retrieveAllDepartments().then(res=> {
      setDepartmentList(res.data)
      console.log('all department list', res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  function onSubmit(values) {
    console.log("depart "+ values.departmentId)
    if(id == -1) {
      //means you have are creating a new todo
      const employeeDto = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        departmentId: values.departmentId
      }
      console.log('creating employee', employeeDto)
      createEmployeeApi(employeeDto)
      .then((res) => {
        navigate("/employees");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else { //id === -1, means some id is passed that means you're updating a already existing todo
      const employeeDto = {
        id: id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        departmentId: values.departmentId
      }
      console.log('updating employee' , employeeDto)
      updateEmployeeApi(id, employeeDto)
      .then((res) => {
        navigate("/employees");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  function onValidate(values) {
    let error = {}
    if (values.firstName.length === 0) {
      error.firstName = "first name is required!";
    }
    if (values.lastName.length === 0) {
      error.lastName = "last name is required!";
    }
    if (values.email.length === 0) {
      error.email = "email is required!";
    }

    return error
  }

    return (
      <div className="container mt-4">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {id == -1 ? (
            <h4 className="text-center">Add Employee</h4>
          ) : (
            <h4 className="text-center">Update Employee</h4>
          )}
          <div className="card-body">
            <Formik
              initialValues={{
                firstName: state !== null ? state.firstName : "",
                lastName: state !== null ? state.lastName : "",
                email: state !== null ? state.email : "",
                departmentId: state !== null ? state.departmentId : "",
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validate={onValidate}
              validateOnChange={false}
              validateOnBlur={false}
            >
              <Form>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="firstName">
                    First Name:
                  </label>
                  {/* <div class="col-sm-10"> */}
                  <Field
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter your first name"
                  />
                  {/* </div> */}
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="alert alert-warning m-2"
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="lastName">
                    Last Name:
                  </label>
                  {/* <div class="col-sm-10"> */}
                  <Field
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                  />
                  {/* </div> */}
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="alert alert-warning m-2"
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-warning m-2 "
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="department">
                    Select Department:
                  </label>
                  <Field
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    name="departmentId"
                    as="select"
                  >
                    <option selected>Open this select menu</option>
                    {departmentList.map((ele) => 
                      <option value={ele.id} key={ele.id}>
                        {ele.departmentName}
                      </option>
                    )}
                  </Field>
                </div>

                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
}