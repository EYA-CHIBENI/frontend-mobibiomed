import {GETALLEQUIPMENTS,GETONEEQUIPMENT,CLEAR_SELECTED_EQUIPMENT} from '../ActionsTypes/EquipmentsActionsTypes'

const initialState = {
  equipments: [],
  selectedEquipment: {},
  errors: []
}

const EquipmentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case GETALLEQUIPMENTS:return {...state,equipments: action.payload}

    case GETONEEQUIPMENT:return {...state,selectedEquipment: action.payload}

    case CLEAR_SELECTED_EQUIPMENT:return {...state,selectedEquipment: {}}

    default:
      return state
 }
}

export default EquipmentsReducer