import { USER_AUTHENTICATED } from "../constant";

const UserAuthenticatedReducer = (state = {}, action) => {
    console.log()
    switch(action.type){
        case USER_AUTHENTICATED:
            return Object.assign({}, state, { isUserAuthenticated:  action.isAuthenticated});
        default:
            return state;
    }
}

export default UserAuthenticatedReducer