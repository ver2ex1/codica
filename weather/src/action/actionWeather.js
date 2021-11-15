import { actionPromise } from "../reducers/promiseReducer";
import axios from "axios"

export const actionWeather = (base , city , key) => async (dispatch) => {
    return await dispatch(actionPromise('weather' , axios.get(`${base}weather?q=${city?.split(/\s+/)?.map(word => word[0]?.toUpperCase() + word.substring(1)).join(' ')}&units=metric&APPID=${key}`)))
}