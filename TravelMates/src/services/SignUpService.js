import axios from "axios";
import { USER_REGISTRATION_API_URL } from "../Constants/APIConstants.js";

export function SignUpService(formData){
    return axios.post(`${USER_REGISTRATION_API_URL}`, formData)
}