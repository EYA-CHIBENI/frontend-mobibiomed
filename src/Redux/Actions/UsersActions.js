import { CURRENTUSER, REGISTER, FAIL, LOGIN, LOGOUT, GETALLUSERS, GETONEUSER, CLEAR_SELECTED_USER } from '../ActionsTypes/UsersActionsTypes'
import axios from 'axios';
import { handleerror } from './ErrorsActions';
const apiURL= process.env.REACT_APP_API_URL

export const register = (cordUser, navigate) => async (dispatch) => {
    try {
        console.log(cordUser)
        const res = await axios.post(`${apiURL}/api/userAuth/SignUp`, cordUser)
        dispatch({
            type: REGISTER,
            payload: res.data
        })
        navigate('/Profile')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleerror(element.msg))
        });
    }
}
export const login = (cordUser, navigate) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiURL}/api/userAuth/SignIn`, cordUser)
        dispatch({
            type: LOGIN,
            payload: res.data
        })
        navigate('/Profile')
    } catch (error) { error.response.data.errors.forEach(element => {
            dispatch(handleerror(element.msg))
        })
    }
}

export const currentuser = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const res = await axios.get(`${apiURL}/api/userAuth/CurrentUser`, config)
        dispatch({
            type: CURRENTUSER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: FAIL,
            payload: error.response.data.errors
        })
    }
}
export const logout = () => {
    return (
        {
            type: LOGOUT,
        }
    )
}


export const getallusers = () => async (dispatch) => {
    try {
        const res = await axios.get(`${apiURL}/api/users/getusers`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        dispatch({
            type: GETALLUSERS,
            payload: res.data.users
        })

    } catch (error) {
        console.log(error)
    }
}

export const getoneuser = (id) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_SELECTED_USER })
        const res = await axios.get(`${apiURL}/api/users/getuser/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        dispatch({
            type: GETONEUSER,
            payload: res.data.user
        })

    } catch (error) {
        console.log(error)
    }
}
export const edituser = (id, updatedUser) => async (dispatch) => {
    try {
        await axios.patch(`${apiURL}/api/users/upuser/${id}`, updatedUser, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        dispatch(getallusers())

    } catch (error) {
        console.log(error)
    }
}

export const deleteuser = (id) => async (dispatch) => {
    try {
        await axios.delete(`${apiURL}/api/users/deleteuser/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        dispatch(getallusers())

    } catch (error) {
        console.log(error)
    }
}