/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";
import { AdminInterface } from "../../interfaces/Iadmin";

// getAllAdmin
export async function getAllAdmin() {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/admin/admins`, {
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

export async function createAdmin(adminData: AdminInterface) {
    const token = sessionStorage.getItem("token")

    try {
        const response = await axios.post(`${apiUrl}/admin/register`, adminData, {
            headers: {
                Authorization: token
            }
        });
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function editAdmin(id: number, AdminData: AdminInterface) {

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/updateadmin/${id}`, AdminData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function changePasswordAdmin(id: number, AdminData: AdminInterface) {

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/changepassword/${id}`, AdminData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function deleteAdmin(id: number) {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.delete(`${apiUrl}/admin/deleteadmin/${id}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    } catch (err: any) {
        throw err.response;
    }
}