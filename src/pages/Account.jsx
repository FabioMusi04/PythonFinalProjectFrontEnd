import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import axiosIstance from '../axios/index';
import { useNavigate } from 'react-router-dom';

const Account = ({ user }) => {
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [account, setAccount] = useState({
        name: '',
        surname: '',
        email: '',
        date_of_birth: '',
        phone_number: '',
        address: '',
        profile_picture: '',
    });
    const [formData, setFormData] = useState(account);


    useEffect(() => {
        setAccount(
            user
                ? {
                    name: user.name || '',
                    surname: user.surname || '',
                    email: user.email || '',
                    date_of_birth: user.date_of_birth ? user.date_of_birth : '',
                    phone_number: user.phone_number || '',
                    address: user.address || '',
                    profile_picture: user.profile_picture || 'https://placehold.co/600x400',
                }
                : {}
        );            
    }, [user]);

    useEffect(() => {
        setFormData(account);
    }, [account]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setAccount(formData);
        setEditMode(false);

        axiosIstance.put(`/users/${user.id}`, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                if (error.status === 403) {
                    console.error('You are not authorized to update this user');
                    navigate('/login');
                }
            });
    };

    if (!account) {
        return <Loading />;
    }

    return (
        <div className="grow bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-8">
                    My Account
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-center col-span-full">
                        <img
                            className="w-32 h-32 object-cover rounded-full"
                            src={account.profile_picture}>
                        </img>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">{account.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Surname
                        </label>
                        {editMode ? (
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">{account.surname}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">{account.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">{account.phone_number || "-"}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date of Birth
                        </label>
                        {editMode ? (
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth ? new Date(formData.date_of_birth).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">{account.date_of_birth || "-"}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        {editMode ? (
                            <input
                                type="text"
                                name="location"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                            />
                        ) : (
                            <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">{account.address || "-"}</p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    {editMode ? (
                        <>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
