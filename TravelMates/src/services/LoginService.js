import axios from "axios";
import { USER_LOGIN_API_URL } from "../Constants/APIConstants.js";

export function UserLogin(formData) {
    return axios.post(`${USER_LOGIN_API_URL}`,formData)
}