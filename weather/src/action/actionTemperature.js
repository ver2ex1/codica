import { actionPromise } from "../reducers/promiseReducer";
import axios from "axios"

export const actionTemperature = (base , city , key) => async (dispatch) => {
    return await dispatch(actionPromise('temperature' , axios.get(`${base + city?.split(/\s+/)?.map(word => word[0]?.toUpperCase() + word.substring(1)).join(' ')}&appid=${key}`)))
}