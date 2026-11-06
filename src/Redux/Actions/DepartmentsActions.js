
import axios from 'axios'
import {GETALLDEPARTMENTS,GETONEDEPARTMENT,CLEAR_SELECTED_DEPARTMENT} from '../ActionsTypes/DepartmentsActionsTypes'
import { handleerror } from './ErrorsActions'
const apiURL= process.env.REACT_APP_API_URL

export const getalldepartments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/departments/getdepartments`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: GETALLDEPARTMENTS, payload: res.data.departments })
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const getonedepartment = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_SELECTED_DEPARTMENT })

  try {
    const res = await axios.get(`${apiURL}/api/departments/getdepartment/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: GETONEDEPARTMENT, payload: res.data.department })
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const adddepartment = (newDepartment) => async (dispatch) => {
  try {
    await axios.post(`${apiURL}/api/departments/adddepartment`, newDepartment, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch(getalldepartments())
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const updatedepartment = (id, updatedDepartment) => async (dispatch) => {
  try {
    await axios.patch(`${apiURL}/api/departments/updepartment/${id}`, updatedDepartment, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch(getalldepartments())
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const deletedepartment = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiURL}/api/departments/deletedepartment/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch(getalldepartments())
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}
