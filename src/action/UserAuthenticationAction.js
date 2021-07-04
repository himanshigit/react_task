import { USER_AUTHENTICATED } from '../constant';

export const UserAuthenticationAction = isAuthenticated => ({
    type: USER_AUTHENTICATED,
    isAuthenticated
});


