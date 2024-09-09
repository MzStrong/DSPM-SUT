/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";
import { UserInterface } from "../../interfaces/Iuser";

// getAllUser
export async function getAllUser() {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/admin/users`, {
            headers: {
                Authorization: token
            }
        });
        if (response.status === 200) {
            console.log(response.data);
            
            return response.data;
            
        }
        // return true;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function createUser(userData: UserInterface) {
    const token = sessionStorage.getItem("token")

    try {
        const response = await axios.post(`${apiUrl}/admin/register`, userData, {
            headers: {
                Authorization: token
            }
        });
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function editUser(id: number, UserData: UserInterface) {

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/updateuser/${id}`, UserData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function changePasswordUser(id: number, UserData: UserInterface) {

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/userchangepassword/${id}`, UserData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function deleteUser(id: number) {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.delete(`${apiUrl}/admin/deleteuser/${id}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    } catch (err: any) {
        throw err.response;
    }
}