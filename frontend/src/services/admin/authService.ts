/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";
import { LoginAdminInterface } from "../../interfaces/Iauth"

// Login
export async function login(authData: LoginAdminInterface) {
    try {
        const response = await axios.post(`${apiUrl}/auth/admin/login`, authData);
        sessionStorage.setItem("token", response.data.token)
    } catch (err: any) {
        throw err.response;
    }
}

// getAdmin
export async function getAdmin() {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/admin/getadmin`, {
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