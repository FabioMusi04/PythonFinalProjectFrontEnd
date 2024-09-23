import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return localStorage.getItem('authToken') !== null;
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;