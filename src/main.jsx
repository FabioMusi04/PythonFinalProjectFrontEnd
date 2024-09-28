import './index.css';

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRouting';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Account from './pages/Account';
import ProductCrud from './pages/ProductCrud';
import Restaurants from './pages/Restaurants';

const App = () => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);


    return (
        <div className="flex flex-col w-full h-screen">
            <Navbar user={user} setUser={setUser} />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                    <Route path="/register" element={<Register  user={user} setUser={setUser} />} />
                    <Route path="/" element={<Home user={user}/>} />
                    <Route path="/account" element={
                        <PrivateRoute user={user} roles={["owner", "admin", "user"]}>
                            <Account  user={user} setUser={setUser} />
                        </PrivateRoute>
                    }
                    />
                    <Route
                        path="/productDashboard"
                        element={
                            <PrivateRoute user={user} roles={["owner", "admin", "user"]}>
                                <ProductCrud />
                            </PrivateRoute>
                        }
                    />  
                    <Route
                        path="/restaurants/me"
                        element={
                            <PrivateRoute user={user} roles={["owner", "admin"]}>
                                <Restaurants />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Router >
        </div>
    );
};

createRoot(document.getElementById('root')).render(<App />);