/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";
import { ChildInterface } from "../../interfaces/Ichild";

// getAllChild
export async function getChild(id: number) {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/admin/child/${id}`, {
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

export async function createChild(childData: ChildInterface) {
    const token = sessionStorage.getItem("token")

    try {
        const response = await axios.post(`${apiUrl}/admin/createchild`, childData, {
            headers: {
                Authorization: token
            }
        });
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function editChild(id: number, ChildData: ChildInterface) {

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/updatechild/${id}`, ChildData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function changeParent(id: number, ChildData: ChildInterface) {

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/changeparent/${id}`, ChildData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function deleteChild(id: number) {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.delete(`${apiUrl}/admin/deletechild/${id}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    } catch (err: any) {
        throw err.response;
    }
}