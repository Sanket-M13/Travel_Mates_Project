import axios from "axios";
import { BOOK_MY_TRIP_API_URL, GET_MY_TRIP_API_URL } from "../Constants/APIConstants";
export function bookMyTrip(id, tripData) {
    return axios.post(`${BOOK_MY_TRIP_API_URL}/${id}`,tripData);
}

export function getMyTrips(id) {
  return axios.get(`${GET_MY_TRIP_API_URL}/${id}`);
}