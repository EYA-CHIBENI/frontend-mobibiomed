import {combineReducers} from 'redux'
import UsersReducer from './UsersReducer'
import ErrorsReducer from './ErrorsReducer';
import EquipmentsReducer from './EquipmentsReducer';
import DepartmentsReducer from './DepartmentsReducer';
import RequestsReducer from './RequestsReducer';
const rootReducer= combineReducers({UsersReducer, ErrorsReducer, EquipmentsReducer,DepartmentsReducer, RequestsReducer})
export default rootReducer;