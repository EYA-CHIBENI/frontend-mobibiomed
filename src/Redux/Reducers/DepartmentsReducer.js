
import {GETALLDEPARTMENTS,GETONEDEPARTMENT,CLEAR_SELECTED_DEPARTMENT} from '../ActionsTypes/DepartmentsActionsTypes'

const initialState = {
  departments: [],
  selectedDepartment: {},
  errors: []
}

const DepartmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLDEPARTMENTS: return { ...state, departments: action.payload }

    case GETONEDEPARTMENT: return { ...state, selectedDepartment: action.payload }

    case CLEAR_SELECTED_DEPARTMENT: return { ...state, selectedDepartment: {} }

    default:
      return state
  }
}

export default DepartmentsReducer
