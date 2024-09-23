import React from 'react';

const RestaurantPage = ({ id }) => {
    return (
        <div className="grow dark:bg-gray-900 dark:text-white">
            <a href="/restaurants/me" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">Back to restaurants</a>
            <header>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Restaurant Name</h1>
                </div>
            </header>
            <main>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg dark:bg-blue-700 dark:shadow-gray-800">Handle restaurant Product</button>
                    
            </main>
        </div>
    );
};

export default RestaurantPage;
