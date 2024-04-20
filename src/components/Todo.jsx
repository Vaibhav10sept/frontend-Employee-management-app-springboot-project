import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createTodoApi, updateTodoApi } from "./todo/api/todoApiService";

export default function Todo() {
  const {state} = useLocation();
  const {id} = useParams()
  const navigate = useNavigate()

  function onSubmit(values) {
    if(id === -1) {
      //means you have are creating a new todo
      const todo = {
        username: 'user',
        description: values.description,
        targetDate: values.targetDate,
        done: values.done
      }
      createTodoApi('user', todo)
      .then((res) => {
        navigate("/todos");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else { //id === -1, means some id is passed that means you're updating a already existing todo
      const todo = {
        id: id,
        username: 'user',
        description: values.description,
        targetDate: values.targetDate,
        done: values.done
      }
      updateTodoApi(id, "user", todo)
      .then((res) => {
        navigate("/todos");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  function onValidate(values) {
    let error = {}
    if (values.description.length === 0) {
      error.description = "description is required!";
    }
    if (values.targetDate === '' || values.targetDate == null) {
      error.description = "Target date is required!";
    }
    return error
  }

    return (
      <div className="container">
        <Formik
          initialValues={{ 
            description: state !== null ? state.description : '',
            targetDate:  state !== null ? state.targetDate : '',
            done: state !== null ? state.done : false,
          }}
          onSubmit={onSubmit}
          validate={onValidate}
          validateOnBlur={false}
          validateOnChange={false }
        >
          <Form>
            <ErrorMessage
            name="description"
            component="div"
            className="alert alert-warning"
            />
            <div className="m-5 form-group">
              <label htmlFor="description" className="m-2">
                Description
              </label>
              <Field className="form-control" name="description"></Field>
              <label htmlFor="description" className="m-2">
                Date
              </label>
              <Field type="date" className="form-control" name="targetDate"></Field>
            </div>
            <button type="submit" className="btn btn-success" >
              Save
            </button>
          </Form>
        </Formik>
      </div>
    );
}