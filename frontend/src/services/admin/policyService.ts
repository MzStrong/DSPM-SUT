const apiUrl = "http://localhost:3000";
import axios from "axios";
import { PolicyInterface } from "../../interfaces/Ipolicy";

export async function getPolicys() {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/admin/getpolicys`, {
            headers: {
                Authorization: token
            }
        });
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function createPolicy(policyData: PolicyInterface) {
    const token = sessionStorage.getItem("token")
    
    try {
        const response = await axios.post(`${apiUrl}/admin/createpolicy`, policyData, {
            headers: {
                Authorization: token
            }
        });
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function editPolicy(id: number, policyData: PolicyInterface) {
    console.log(policyData);

    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/updatepolicy/${id}`, policyData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function deletePolicy(id: number) {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.delete(`${apiUrl}/admin/deletepolicy/${id}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    } catch (err: any) {
        throw err.response;
    }
}

export async function updatePolicyStatus(id: number, status: boolean) {

    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.patch(`${apiUrl}/admin/updatepolicystatus/${id}`, {status}, {
            headers: {
                Authorization: token
            }
        });
        
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}