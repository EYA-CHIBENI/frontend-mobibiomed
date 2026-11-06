import { CURRENTUSER, REGISTER, FAIL, LOGIN, LOGOUT, GETALLUSERS, GETONEUSER, CLEAR_SELECTED_USER } from '../ActionsTypes/UsersActionsTypes'

const initialState = {
    user: {},
    users:[],
    selectedUser : {},
    errors: []
}
const UsersReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER: localStorage.setItem('token', action.payload.token)
            return { ...state, user: action.payload.newUser, errors: [] }

        case FAIL: return { ...state, errors: action.payload }

        case LOGIN: localStorage.setItem('token', action.payload.token)
            return { ...state, user: action.payload.found, errors: [] }

        case CURRENTUSER: return { ...state, user: action.payload }

        case LOGOUT: localStorage.removeItem('token')
            return { ...state, user: {}, errors: [] }

        case GETALLUSERS: return { ...state, users: action.payload }

        case GETONEUSER: return { ...state, selectedUser: action.payload }


        case CLEAR_SELECTED_USER: return { ...state, selectedUser: {} };
        default: return state;
    }
}
export default UsersReducer;