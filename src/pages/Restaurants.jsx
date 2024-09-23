import React from 'react';
import RestaurantList from '../components/RestaurantList';

const Restaurants = () => {
    return (
        <div className="grow container mx-auto p-4 dark:bg-gray-900 dark:text-white bg-white text-black">
            <h1 className="text-3xl font-bold mb-6">Your Restaurants</h1>
            <RestaurantList />
        </div>
    );
};

export default Restaurants;