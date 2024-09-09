/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";
import { LoginUserInterface, RegisterInterface } from "../../interfaces/Iauth"

// Login
export async function login(authData: LoginUserInterface) {
    try {
        const response = await axios.post(`${apiUrl}/auth/user/login`, authData);
        sessionStorage.setItem("token", response.data.token)
    } catch (err: any) {
        throw err.response;
    }
}

// Register
export async function register(authData: RegisterInterface) {
    try {
        const response = await axios.post(`${apiUrl}/auth/user/register`, authData);
        sessionStorage.setItem("token", response.data.token)
        return response
    } catch (err: any) {
        throw err.response;
    }
}

// getUser
export async function getUser() {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/user/getuser`, {
            headers: {
                Authorization: token
            }
        });
        if (response.status === 200) {            
            return response.data;
        }
        // return true;
    } catch (err: any) {
        throw err.response.data.message;
    }
}