/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";

export async function getRelationships() {
    try {
        const relationships = await axios.get(`${apiUrl}/api/relationships`);
        
        return relationships

    } catch (err: any) {
        throw err.response;
    }
}
export async function getGenders() {
    try {
        const genders = await axios.get(`${apiUrl}/api/genders`);
        
        return genders

    } catch (err: any) {
        throw err.response;
    }
}
export async function getTopics() {
    try {
        const topics = await axios.get(`${apiUrl}/api/topics`);
        
        return topics

    } catch (err: any) {
        throw err.response;
    }
}