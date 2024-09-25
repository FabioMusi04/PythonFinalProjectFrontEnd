import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import Loading from "./Loading";

import RestaurantPage from "./RestaurantPage";
import RestaurantCreation from "./RestaurantCreation";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState({
    componentId: 1,
    restaurantId: 0,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        axiosInstance
          .get("/restaurants/me")
          .then((res) => setRestaurants(res.data))
          .catch((err) => console.log(err));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const showRestaurantPage = (restaurantId) => () => {
    setSelectedComponent({
      componentId: 2,
      restaurantId,
    });
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 dark:text-red-300">
        Error: {error}
      </div>
    );

  return selectedComponent.componentId === 1 ? (
    <div className="grow container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-center mb-6">
        <button onClick={() => setIsOpenModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Restaurant
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Restaurant List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.length === 0 && (
          <p className="text-center">No restaurants found</p>
        )}
        {restaurants.map((restaurant) => (
          <div
            onClick={showRestaurantPage(restaurant.id)}
            key={restaurant.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {restaurant.address}, {restaurant.city}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {restaurant.status}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {restaurant.phone} - {restaurant.webisite}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {restaurant.description}
            </p>
          </div>
        ))}
      </div>
      <RestaurantCreation setIsOpen={setIsOpenModal} isOpen={isOpenModal} />
    </div>
  ) : selectedComponent.componentId === 2 ? (
    <RestaurantPage id={selectedComponent.restaurantId} />
  ) : null;
};

export default RestaurantList;
