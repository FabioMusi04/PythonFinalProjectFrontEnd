import React, { useState } from 'react';

const RestaurantCreation = ({ isOpen, setIsOpen }) => {
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <button
                onClick={toggleModal}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Restaurant
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-2/3">
                        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Create Restaurant</h2>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        name="status"
                                        id="status"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-4 col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantCreation;