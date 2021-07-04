import { combineReducers } from 'redux';
import UserAuthenticatedReducer from './UserAuthenticatedReducer';
import EmployeeListReducer from './EmployeeListReducer';

const allReducers = combineReducers({
    UserAuthenticatedReducer,
    EmployeeListReducer,
})

export default allReducers;