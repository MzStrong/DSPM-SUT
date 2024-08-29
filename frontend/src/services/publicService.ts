/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:3000";
import axios from "axios";

// Register
export async function getTopics() {
    try {
        const topics = await axios.get(`${apiUrl}/api/topics`);
        
        return topics

    } catch (err: any) {
        throw err.response;
    }
}