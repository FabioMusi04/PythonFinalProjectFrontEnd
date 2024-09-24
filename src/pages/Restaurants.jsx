import RestaurantList from '../components/RestaurantList';

const Restaurants = () => {
    return (
        <div className="grow justify-center p-5 dark:bg-gray-900 dark:text-white bg-white text-black">
            <h1 className="text-3xl font-bold text-center mb-6">Your Restaurants</h1>
            <RestaurantList />
        </div>
    );
};

export default Restaurants;