import { apiClient } from './apiClient';

// Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const retrieveAllEmployees = () => {
    return apiClient.get(`employees`)
}

export const deleteEmployeeApi = (id) => {
    return apiClient.delete(`employees/${id}`)
}

export const updateEmployeeApi = (id, employeeDto) => {
    return apiClient.put(`employees/${id}`, employeeDto)
}

export const createEmployeeApi = (employeeDto) => {
    return apiClient.post(`employees`, employeeDto)
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