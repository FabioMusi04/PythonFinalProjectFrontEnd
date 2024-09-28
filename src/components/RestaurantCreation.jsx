import PropTypes from "prop-types";
import axiosInstance from "../axios";
import Alert from "./Alert";
import { useState } from "react";

const RestaurantCreation = ({ isOpen, setIsOpen }) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [alert, setAlert] = useState({
    message: "",
    type: "",
    onClose: () => {},
  });

  const [formData, setFormData] = useState({
    name: "",
    status: "under_review",
    email: "",
    phone_number: "",
    website: "",
    description: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRestaurant = (e) => {
    console.log(formData);
    e.preventDefault();
    if (
      !formData.name ||
      !formData.status ||
      !formData.email
    ) {
      return setAlert({
        message: "Please fill in all fields!",
        type: "error",
        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
      });
    }
    axiosInstance
      .post("/restaurants/", formData)
      .then(() => {
        setAlert({
          message: "Restaurant created successfully!",
          type: "success",
          onClose: () => {
            setAlert({ message: "", type: "", onClose: () => {} });
            toggleModal();
            return window.location.reload();
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setAlert({
          message: error.response.data.detail || "An error occurred!",
          type: "error",
          onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
        });
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      {isOpen && (
        <>
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={alert.onClose}
          />

          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg m-3">
              <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">
                Create Restaurant
              </h2>
              <form onSubmit={handleCreateRestaurant}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="under_review" selected>Under Review</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <div className="mb-4 col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      onChange={handleChange}
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
        </>
      )}
    </div>
  );
};

RestaurantCreation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default RestaurantCreation;
