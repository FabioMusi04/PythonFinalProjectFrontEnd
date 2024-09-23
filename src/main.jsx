import './index.css';

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRouting';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';

const Dashboard = () => <h2>Dashboard</h2>;

const App = () => {

    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);


    return (
        <div className="flex flex-col w-full h-screen">
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login user={user} />} />
                    <Route path="/register" element={<Register uxser={user} />} />
                    <Route path="/" element={<Home user={user} />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute user={user} roles={["owner", "admin"]}>
                                <Dashboard />
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