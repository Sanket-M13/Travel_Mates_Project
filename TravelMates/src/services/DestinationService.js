import axios from 'axios';
import { ADD_DESTINATION_API_URL, GET_DESTINATION_API_URL } from "../Constants/APIConstants.js";
import { getToken } from './TokenService.js';

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export function getAllDestination() {
    return axios.get(GET_DESTINATION_API_URL,getAuthHeader());
}

export function AddDesitnation(formData) {
    return axios.post(ADD_DESTINATION_API_URL,formData );
    
}