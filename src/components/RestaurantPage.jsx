import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import Alert from "./Alert";

const RestaurantPage = ({ id }) => {
  const [editMode, setEditMode] = useState(false);
  const [restaurant, setRestaurant] = useState({
    name: "",
    status: "",
    email: "",
    phone_number: "",
    website: "",
    description: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
  });
  const [formData, setFormData] = useState(restaurant);

  useEffect(() => {
    axiosInstance
      .get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setFormData(restaurant);
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [alert, setAlert] = useState({
    type: "",
    message: "",
    onClose: () => {},
  });

  const handleSave = () => {
    setRestaurant(formData);
    setEditMode(false);
    console.log(formData);
    axiosInstance
      .put(`/restaurants/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        setAlert({
          type: "success",
          message: "Restaurant updated successfully",
          onClose: () => {
            setAlert({ type: "", message: "", onClose: () => {} });
            setRestaurant(response.data);
            setFormData(response.data);
          },
        });
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: error.response.data.detail || error.message,
          onClose: () => {
            setAlert({ type: "", message: "", onClose: () => {} });
            setRestaurant(restaurant);
            setFormData(restaurant);
          },
        });
      });
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/restaurants/${id}`)
      .then(() => {
        setAlert({
          type: "success",
          message: "Restaurant deleted successfully",
          onClose: () => {
            setAlert({ type: "", message: "", onClose: () => {} });
            window.location.href = "/restaurants/me";
          },
        });
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: error.response.data.detail || error.message,
          onClose: () => {
            setAlert({ type: "", message: "", onClose: () => {} });
          },
        });
      });
  }

  return (
    <>
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={alert.onClose}
      />

      <div className="grow bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
          <a
            href="/restaurants/me"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Back to restaurants
          </a>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Restaurant Name: {restaurant.name} (ID: {id})
            </h1>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-8">
            My restaurant
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                status
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.status}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.email || "-"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="phone_number"
                  value={formData.phone_number || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.phone_number || "-"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL Website
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.website || "-"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.description || "-"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.address || ""}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.city || ""}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.country || ""}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Postal Code
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-800 dark:text-gray-300">
                  {restaurant.postal_code || ""}
                </p>
              )}
            </div>
          </div>
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
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition transform hover:scale-105"
                >
                  Edit Restaurant
                </button>

                <button
                  onClick={() => handleDelete(restaurant.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition transform hover:scale-105"
                >
                  Delete Restaurant
                </button>
              </>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-5">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 dark:bg-green-700 dark:shadow-gray-800">
              Handle restaurant Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

RestaurantPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default RestaurantPage;
