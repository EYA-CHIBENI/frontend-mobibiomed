import axios from 'axios'

import {
  GET_MY_REQUESTS,
  GET_PENDING_REQUESTS,
  ADD_REQUEST,
  REQUESTS_LOADING,
  UPDATE_REQUEST,
  GET_ONE_REQUEST,
  GET_MY_REVIEWS,
  GET_MY_ASSIGNMENTS,
  GET_ALL_REQUESTS
} from '../ActionsTypes/RequestsActionsTypes'

import { handleerror } from './ErrorsActions'
const apiURL= process.env.REACT_APP_API_URL

export const getmyrequests = () => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.get(`${apiURL}/api/requests/myrequests`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({
      type: GET_MY_REQUESTS,
      payload: res.data.requests
    })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const getpendingrequests = () => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.get(`${apiURL}/api/requests/getpendingrequests`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({
      type: GET_PENDING_REQUESTS,
      payload: res.data.requests
    })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const addrequest = request => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.post(`${apiURL}/api/requests/addrequest`, request, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({
      type: ADD_REQUEST,
      payload: res.data.newRequest
    })

    return true
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    return false
  }
}
export const claimrequest = id => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.patch(`${apiURL}/api/requests/claim/${id}`, {}, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const approverequest = id => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })
console.log(id)
  try {
    const res = await axios.patch(`${apiURL}/api/requests/approve/${id}`, {}, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const rejectrequest = (id, reason) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')

    await axios.patch(`${apiURL}/api/requests/reject/${id}`, {
      rejectionReason: reason
    }, {
      headers: { Authorization: token }
    })

    return true
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    return false
  }
}

export const schedulerequest = (id, scheduleData) => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.patch(`${apiURL}/api/requests/schedule/${id}`, scheduleData, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
    return true
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    return false
  }
}

export const assigntechnician = (id, technicianId) => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.patch(`${apiURL}/api/requests/assign/${id}`, {
      assignedTo: technicianId
    }, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
    return true
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    return false
  }
}
export const startintervention = id => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.patch(`${apiURL}/api/requests/start/${id}`, {}, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
    return true
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    return false
  }
}
export const completeintervention = (id, interventionReport) => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.patch(`${apiURL}/api/requests/complete/${id}`, { interventionReport }, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
    return true
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    return false
  }
}
export const addcomment = (id, message) => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.post(`${apiURL}/api/requests/comment/${id}`, { message }, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: REQUESTS_LOADING, payload: false })
    return res.data.comments
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}
export const cancelrequest = id => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.patch(`${apiURL}/api/requests/cancel/${id}`, {}, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: UPDATE_REQUEST, payload: res.data.request })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const getonerequest = id => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.get(`${apiURL}/api/requests/getrequest/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({
      type: GET_ONE_REQUEST,
      payload: res.data.request
    })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}

export const getmyreviews = () => async (dispatch) => {
  dispatch({ type: REQUESTS_LOADING })

  try {
    const token = localStorage.getItem('token')

    const res = await axios.get(`${apiURL}/api/requests/myreviews`, {
      headers: { Authorization: token }
    })

    dispatch({
      type: GET_MY_REVIEWS,
      payload: res.data.requests
    })
  } catch (error) {
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
    dispatch({ type: REQUESTS_LOADING, payload: false })
  }
}

export const getmyassignments = () => async dispatch => {
  dispatch({ type: REQUESTS_LOADING, payload: true })

  try {
    const res = await axios.get(`${apiURL}/api/requests/myassignments`, {
      headers: { Authorization: localStorage.getItem('token') }
    })

    dispatch({ type: GET_MY_ASSIGNMENTS, payload: res.data.requests })
  } catch (error) {
    dispatch({ type: REQUESTS_LOADING, payload: false })
    error.response?.data?.error?.forEach(element => dispatch(handleerror(element.msg)))
  }
}
export const getallrequests = () => async (dispatch) => {
    try {
        const res = await axios.get(`${apiURL}/api/requests/getallrequests`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        dispatch({
            type: GET_ALL_REQUESTS,
            payload: res.data.requests
        })
    } catch (error) {
        error.response?.data?.errors?.forEach(element => dispatch(handleerror(element.msg)))
    }
}