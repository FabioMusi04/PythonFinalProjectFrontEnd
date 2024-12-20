import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const isAuthenticated = (user, roles) => {
    const tokenExists = localStorage.getItem('token') !== null;
    const userExists = user !== null;
    const roleIsValid = roles ? roles.includes(user.role) : true;

    const isTokenExpired = new Date(JSON.parse(localStorage.getItem('token'))?.expires_in) * 1000 <= Date.now();
    
    return tokenExists && userExists && roleIsValid && !isTokenExpired;
};

const PrivateRoute = ({ user, roles, children }) => { //add role check
    return isAuthenticated(user, roles) ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    user: PropTypes.object,
    roles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;