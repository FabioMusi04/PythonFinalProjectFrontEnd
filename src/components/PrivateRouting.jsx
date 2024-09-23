import { Navigate } from 'react-router-dom';

const isAuthenticated = (user, roles) => {
    return localStorage.getItem('token') !== null && user !== null && roles.includes(user.role);
};

const PrivateRoute = ({ user, roles, children }) => { //add role check
    return isAuthenticated(user, roles) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;