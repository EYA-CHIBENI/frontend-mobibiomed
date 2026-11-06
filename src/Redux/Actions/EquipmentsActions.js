
import axios from 'axios'
import { GETALLEQUIPMENTS, GETONEEQUIPMENT, CLEAR_SELECTED_EQUIPMENT } from '../ActionsTypes/EquipmentsActionsTypes'
import { handleerror } from './ErrorsActions'
const apiURL= process.env.REACT_APP_API_URL

export const getallequipments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/equipments/getequipments`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: GETALLEQUIPMENTS, payload: res.data.equipments })
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const getoneequipment = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_SELECTED_EQUIPMENT })

  try {
    const res = await axios.get(`${apiURL}/api/equipments/getequipment/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: GETONEEQUIPMENT, payload: res.data.equipment })
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const addequipment = (newEquipment) => async (dispatch) => {
  try {
    await axios.post(`${apiURL}/api/equipments/addequipment`, newEquipment, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch(getallequipments())
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const updateequipment = (id, updatedEquipment) => async (dispatch) => {
  try {
    await axios.patch(`${apiURL}/api/equipments/upequipment/${id}`, updatedEquipment, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch(getallequipments())
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const deleteequipment = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiURL}/api/equipments/deleteequipment/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch(getallequipments())
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}
