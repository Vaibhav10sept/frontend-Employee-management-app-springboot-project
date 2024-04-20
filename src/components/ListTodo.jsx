import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsername } from "./todo/api/todoApiService";
import { useNavigate } from "react-router-dom";

export default function ListTodo() {
    const [todoList, settodoList] = useState([])
    useEffect(()=>refreshTodo(),[])
    const navigate = useNavigate()

    function refreshTodo() {
      retrieveAllTodosForUsername('user')
        .then((response) => {
          settodoList(response.data);
         console.log('fetch todo',response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function deleteTodo(id) {
        deleteTodoApi(id, 'user')
        .then((res) => {
          alert(`Deletion of todo with ${id} is successfull`)
          refreshTodo()
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function updateTodo(id, description, targetDate, done) {
      navigate(`/todo/${id}`, { state: { description, targetDate, done} });
    }


    return (
      <div className="container">
        <h1>Things you want to do!</h1>
        <table className="table  ">
          <thead>
            <tr>
              <th>ID</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((ele) => {
              return (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.description}</td>
                  <td>
                    <button
                      className="m-1 btn btn-warning"
                      onClick={() => deleteTodo(ele.id, ele.targetDate)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="m-1 btn btn-success"
                      onClick={() => updateTodo(ele.id, ele.description, ele.targetDate, ele.done)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-success mb-5" onClick={()=>navigate('/todo/-1')}>Add New Todo</button>
      </div>
    );
}