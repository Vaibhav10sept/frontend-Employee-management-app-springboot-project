import { createContext, useContext, useState } from "react"
import { executeJWTAuthentication } from "../todo/api/todoApiService";
import { apiClient } from "../todo/api/apiClient";
import React from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthContextWrapper({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // async function loginHandler(username, password) {
    //     console.log('loing handler called')
    //     const basicAuthorizationToken = 'basic ' + window.btoa(username + ':' + password)

    //     const res = await executeBasicAuthentication(basicAuthorizationToken)
    //     try {
    //         if(res.status === 200) {
    //             setIsAuthenticated(true)
    //             setUsername(username)
    //             setToken(basicAuthorizationToken)

    //             apiClient.interceptors.request.use(config => {
    //                 config.headers.Authorization = basicAuthorizationToken
    //                 return config
    //             })
    //             return true
    //         }
    //         else {
    //             logout() 
    //             return false
    //         }
    //     }
    //     catch(err) {
    //         logout()
    //         return false
    //     }
    // }

    async function loginHandler(username, password) {
        // executeJWTAuthentication(username, password)
        // .then(res => {
        //     console.log('jwt res ' + res.data)
        // })
        // .catch(err => {
        //     console.log('jwt err '+ err)
        // })

        const res = await executeJWTAuthentication(username, password)
        console.log('login test ', res)
        try {
            if(res.status === 200) {
                const JwtToken = 'Bearer ' + res.data.token
                setIsAuthenticated(true)
                setUsername(username)
                setToken(JwtToken)
                console.log('jwt token ', JwtToken) 

                apiClient.interceptors.request.use(config => {
                    config.headers.Authorization = JwtToken 
                    return config
                })
                return true
            }
            else {
                logout() 
                return false
            }
        }
        catch(err) {
            logout()
            return false
        }
    }


    function logout() {
        setIsAuthenticated(false) 
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, 
                                    setIsAuthenticated,
                                    username, 
                                    setUsername, 
                                    loginHandler,
                                    logout,
                                    token}}>
        {children}
        </AuthContext.Provider>
    )  
}