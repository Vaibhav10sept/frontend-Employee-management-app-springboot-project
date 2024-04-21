import { apiClient } from './apiClient';

// Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const retrieveAllDepartments = () => {
    return apiClient.get(`departments`)
}

export const deleteDepartmentApi = (id) => {
    return apiClient.delete(`departments/${id}`)
}

export const updateDepartmentApi = (id, department) => {
    return apiClient.put(`departments/${id}`, department)
}

export const createDepartmentApi = (department) => {
    return apiClient.post('departments', department)
} 

// export const executeBasicAuthentication = (token) => {
//     return apiClient.get('/basicauth', {
//         headers: {
//             Authorization: token
//         }
//     })
// } 

// export const executeJWTAuthentication = (username, password) => {
//     return apiClient.post('/authenticate', {
//       username,
//       password
//     }) 
// } 