import axios from "axios";
import { BOOK_MY_TRIP_API_URL, GET_MY_TRIP_API_URL,GET_USER_NAME_AND_ID } from "../Constants/APIConstants";
import { getToken } from "./TokenService";

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}


export function bookMyTrip(id, tripData) {
    return axios.post(`${BOOK_MY_TRIP_API_URL}/${id}`,tripData);
}

export function getMyTrips(id) {
  return axios.get(`${GET_MY_TRIP_API_URL}/${id}`);
}

export function getUserId(){
  return axios.get(`${GET_USER_NAME_AND_ID}`,getAuthHeader());
}