import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';

const Orders = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
    ]);

    const restaurantId = window.location.pathname.split('/')[2];
    const tableId = window.location.pathname.split('/')[4];


    return (
        <div className="flex">
            <Drawer categories={categories} />
            <ProductList tableId={tableId} restaurantId={restaurantId} />
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

const ProductList = ({ tableId, restaurantId }) => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit] = useState(10); // Adjust this number based on how many products you want to load per request
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Function to load more products using skip and limit
    const loadMoreProducts = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/products/${restaurantId}`, {
                    params: { skip, limit } // Sending skip and limit as query params
                });
                const newProducts = response.data.products;

                if (newProducts.length === 0) {
                    setHasMore(false); // No more products to load
                } else {
                    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
                    setSkip((prevSkip) => prevSkip + limit); // Increment skip for the next request
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Scroll event listener for infinite scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && hasMore) {
                loadMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [skip, hasMore, loading]);

    useEffect(() => {
        loadMoreProducts(); // Load the first batch of products on component mount
    }, []);

    return (
        <div className="flex-1 container mx-auto p-4 dark:bg-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Order Your Favorite Dishes</h1>
            <div className="border rounded-lg p-4 shadow-lg mb-3 text-center dark:bg-gray-700">
                <h2 className="text-xl font-semibold">Table {tableId}</h2>
                <p className="text-gray-700 dark:text-gray-300">Order your favorite dishes from the menu</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length === 0 && !loading && <p className="text-center">No products available</p>}
                {products.map(product => (
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
                            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900">
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show loading spinner or message when loading */}
            {loading && (
                <div className="text-center mt-4">
                    <p>Loading more products...</p>
                </div>
            )}

            {/* Show message if there are no more products */}
            {!hasMore && (
                <div className="text-center mt-4">
                    <p>No more products to show.</p>
                </div>
            )}
        </div>
    );
};