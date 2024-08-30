/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";
import { EvaluationInterface } from "../../interfaces/Ievaluation";

export async function getEvaluations() {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.get(`${apiUrl}/admin/getevaluations`, {
            headers: {
                Authorization: token
            }
        });
        
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function createEvaluation(evaluationData: EvaluationInterface) {
    const token = sessionStorage.getItem("token")
    
    try {
        const response = await axios.post(`${apiUrl}/admin/createevaluation`, evaluationData, {
            headers: {
                Authorization: token
            }
        });
        return response.data

    } catch (err: any) {
        throw err.response;
    }
}

export async function editEvaluation(id: number, evaluationData: EvaluationInterface) {
    const token = sessionStorage.getItem("token");
    try {
        const response = await axios.put(`${apiUrl}/admin/updateevaluation/${id}`, evaluationData, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export async function deleteEvaluation(id: number) {
    const token = sessionStorage.getItem("token")
    try {
        const response = await axios.delete(`${apiUrl}/admin/deleteevaluation/${id}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    } catch (err: any) {
        throw err.response;
    }
}

// export async function updateEvaluationStatus(id: number, status: boolean) {

//     const token = sessionStorage.getItem("token")
//     try {
//         const response = await axios.patch(`${apiUrl}/admin/updateevaluationstatus/${id}`, {status}, {
//             headers: {
//                 Authorization: token
//             }
//         });
        
//         return response.data

//     } catch (err: any) {
//         throw err.response;
//     }
// }