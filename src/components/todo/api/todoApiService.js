import { apiClient } from './apiClient';

// Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const retrieveAllTodosForUsername = (username) => {
    return apiClient.get(`users/${username}/todos`)
}

export const deleteTodoApi = (id, username) => {
    return apiClient.delete(`users/${username}/todos/${id}`)
}

export const updateTodoApi = (id, username, todo) => {
    return apiClient.put(`users/${username}/todos/${id}`, todo)
}

export const createTodoApi = (username, todo) => {
    return apiClient.post(`users/${username}/todos`, todo)
} 

export const executeBasicAuthentication = (token) => {
    return apiClient.get('/basicauth', {
        headers: {
            Authorization: token
        }
    })
} 

export const executeJWTAuthentication = (username, password) => {
    return apiClient.post('/authenticate', {
      username,
      password
    }) 
} 