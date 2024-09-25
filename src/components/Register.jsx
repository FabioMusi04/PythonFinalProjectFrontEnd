import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Alert from './Alert';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('example@example.com');
    const [password, setPassword] = useState('examplepassword');
    const [confirmPassword, setConfirmPassword] = useState('examplepassword');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [alert, setAlert] = useState({
        type: '',
        message: '',
        onClose: () => { }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert(
                {
                    type: 'error',
                    message: 'Passwords do not match',
                    onClose: () => {
                        setAlert({ type: '', message: '', onClose: () => { } });
                        setPassword('');
                        setConfirmPassword('');
                    }
                }
            );
            return;
        }
        console.log('Email:', email);
        console.log('Password:', password);

        axiosInstance.post('/register', { email, password })
            .then((response) => {
                if (response.status <= 201 && response.status >= 300) {
                    throw new Error(response.detail);
                }
                setAlert(
                    {
                        type: 'success',
                        message: 'Registration successful',
                        onClose: () => {
                            navigate('/login');
                        }
                    }
                );
            })
            .catch((error) => {
                setAlert(
                    {
                        type: 'error',
                        message: error.response.data.detail,
                        onClose: () => {
                            setAlert({ type: '', message: '', onClose: () => { } });
                            setEmail('');
                            setPassword('');
                            setConfirmPassword('');
                        }
                    }
                );
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="relative grow justify-center bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 px-6">
            <Alert type={alert.type} message={alert.message} onClose={alert.onClose} />
            <div className="relative bg-white dark:bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">Register</h2>
                <form onSubmit={handleSubmit}  className="dark:text-gray-300 text-black-300">
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                        Register
                    </button>
                    <div className="text-end mt-4">
                        <a href="/login" className="text-indigo-600 hover:underline">You already have an account? Login HERE</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;