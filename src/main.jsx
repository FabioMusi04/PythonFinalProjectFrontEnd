import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRouting';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';

const Dashboard = () => <h2>Dashboard</h2>;

const App = () => (
    <div className="flex flex-col w-full h-screen">
        <Navbar />
        <Router>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
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

createRoot(document.getElementById('root')).render(<App />);