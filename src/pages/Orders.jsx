import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../axios';
import PropTypes from 'prop-types';

const Orders = () => {
    const [categories, setCategories] = useState([]);

    const restaurantId = window.location.pathname.split('/')[2];
    const tableId = window.location.pathname.split('/')[4];

    return (
        <div className="flex">
            <Drawer categories={categories} />
            <ProductList tableId={tableId} restaurantId={restaurantId} categories={categories} setCategories={setCategories} />
        </div>
    );
};
export default Orders;

const Drawer = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-10 p-2 bg-blue-500 text-white rounded-md fixed top-4 left-4 z-50"
            >
                ☰
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-200 dark:bg-gray-800 p-4 z-50 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id} className="mb-2">
                            <a
                                href={`#${category.name}`}
                                className="text-blue-500 dark:text-blue-300 hover:underline"
                            >
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Button to close the drawer */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 mt-4 p-2 bg-red-500 text-white rounded-md"
                >
                    ✖
                </button>
            </div>
        </>
    );
};

Drawer.propTypes = {
    categories: PropTypes.array.isRequired,
};



const ProductList = ({ tableId, restaurantId, setCategories, categories }) => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit] = useState(10); // Adjust this number based on how many products you want to load per request
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [order, setOrder] = useState({});

    const loadMoreProducts = useCallback(async () => {
        if (!loading && hasMore) {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/products/${restaurantId}`, {
                    /* params: { skip, limit } */
                });
                const newProducts = response.data.products;

                if (newProducts.length === 0) {
                    setHasMore(false);
                } else {
                    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
                    setSkip((prevSkip) => prevSkip + limit);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [loading, hasMore, restaurantId, limit]);

    useEffect(() => {
        loadMoreProducts(); // Load the first batch of products on component mount
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get(`/categories/${restaurantId}`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [restaurantId, setCategories]);

    // Function to group products by category
    const groupProductsByCategory = () => {
        const groupedProducts = {};
        products.forEach(product => {
            if (!groupedProducts[product.category.name]) {
                groupedProducts[product.category.name] = [];
            }
            groupedProducts[product.category.name].push(product);
        });
        return groupedProducts;
    };

    const groupedProducts = groupProductsByCategory();

    const handleQuantityChange = (productId, change) => {
        setOrder((prevOrder) => {
            const newOrder = { ...prevOrder };
            if (!newOrder[productId]) {
                newOrder[productId] = 0;
            }
            newOrder[productId] += change;
            if (newOrder[productId] < 0) {
                newOrder[productId] = 0;
            }
            return newOrder;
        });
    };

    const handlePlaceOrder = () => {
        console.log("Order placed:", order);
        // Implement order submission logic here
    };

    return (
        <div className="p-4 dark:bg-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Order Your Favorite Dishes</h1>
            <div className="border rounded-lg p-4 shadow-lg mb-3 text-center dark:bg-gray-700">
                <h2 className="text-xl font-semibold">Table {tableId}</h2>
                <p className="text-gray-700 dark:text-gray-300">Order your favorite dishes from the menu</p>
            </div>
            {categories.map((category) => (
                <div key={category.id} id={category.name} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {groupedProducts[category.name]?.length ? (
                            groupedProducts[category.name].map((product) => (
                                <div key={product.id} className="border rounded-lg p-4 shadow-lg dark:bg-gray-700 flex">
                                    <img
                                        src={product.image || "https://placehold.co/600x400"}
                                        alt={product.name}
                                        className="w-24 h-24 object-cover mr-4 rounded-xl"
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold">{product.name}</h2>
                                        <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                                        <p className="text-gray-900 font-bold dark:text-gray-100">${product.price}</p>
                                        {product.discount && <p className="text-red-500 dark:text-red-400">Discount: {product.discount}%</p>}
                                        <p className={`mt-2 ${product.status === 'available' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                            {product.status.replace('_', ' ')}
                                        </p>
                                        <div className="flex items-center mt-4">
                                            <button
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{order[product.id] || 0}</span>
                                            <button
                                                onClick={() => handleQuantityChange(product.id, 1)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full">No products available in this category</p>
                        )}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="text-center mt-4">
                    <p>Loading more products...</p>
                </div>
            )}
            {!hasMore && (
                <div className="text-center mt-4">
                    <p>No more products to show.</p>
                </div>
            )}
            <button
                onClick={handlePlaceOrder}
                className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-900"
            >
                Place Order
            </button>
        </div>
    );
};
ProductList.propTypes = {
    tableId: PropTypes.string.isRequired,
    restaurantId: PropTypes.string.isRequired,
    setCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
};