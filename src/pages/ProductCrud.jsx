import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Alert from "../components/Alert";

const ProductCrud = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        id: null,
        name: "",
        price: "",
        description: "",
        status: "available",
        discount: "",
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [restaurantId, setRestaurantId] = useState(
        location.pathname.split("/")[2]
    );
    const limit = 10;

    const [alert, setAlert] = useState({
        message: "",
        type: "",
        onClose: () => {},
    });

    const [showDiscount, setShowDiscount] = useState(false);

    useEffect(() => {
        const fetchProducts = () => {
            const skip = (page - 1) * limit;
            axiosInstance
                .get(`/products/${restaurantId}?skip=${skip}&limit=${limit}`)
                .then((res) => {
                    setAlert({
                        message: "Products loaded successfully",
                        type: "success",
                        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                    });
                    setProducts(res.data.products);
                    setTotalPages(Math.ceil(res.data.total / limit));
                })
                .catch((err) => {
                    setAlert({
                        message: "Failed to load products",
                        type: "error",
                        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                    });
                    console.error(err);
                });
        };

        fetchProducts();
    }, [page, restaurantId]);

    useEffect(() => {
        if (restaurantId) {
            setRestaurantId(restaurantId);
        }
    }, [restaurantId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!showDiscount) {
            delete form.discount;
        }
        console.log("Form submitted:", form);

        form.restaurant_id = restaurantId;
        if (form.id) {
            axiosInstance
                .put(`/products/${form.id}`, form)
                .then((res) => {
                    setAlert({
                        message: "Product updated successfully",
                        type: "success",
                        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                    });
                    setProducts(
                        products.map((product) =>
                            product.id === form.id ? res.data : product
                        )
                    );
                    console.log("Product updated:", res.data);
                })
                .catch((err) => {
                    setAlert({
                        message: "Failed to update product",
                        type: "error",
                        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                    });
                    console.error(err);
                });
        } else {
            axiosInstance
                .post(`/products`, form)
                .then((res) => {
                    setAlert({
                        message: "Product created successfully",
                        type: "success",
                        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                    });
                    setProducts([...products, res.data.product.new_product]);
                    console.log("Product created:", res.data);
                })
                .catch((err) => {
                    setAlert({
                        message: "Failed to create product",
                        type: "error",
                        onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                    });
                    console.error(err.response.data.errors);
                });
        }
        setForm({
            id: null,
            name: "",
            price: "",
            description: "",
            status: "available",
            discount: "",
        });
        setShowDiscount(false);
    };

    const handleEdit = (product) => {
        setForm({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description || "",
            status: product.status,
            discount: product.discount,
        });
        setShowDiscount(!!product.discount);
    };

    const handleDelete = (id) => {
        axiosInstance
            .delete(`/products/${id}`)
            .then(() => {
                setAlert({
                    message: "Product deleted successfully",
                    type: "success",
                    onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                });
                setProducts(products.filter((product) => product.id !== id));
                console.log("Product deleted");
            })
            .catch((err) => {
                setAlert({
                    message: "Failed to delete product",
                    type: "error",
                    onClose: () => setAlert({ message: "", type: "", onClose: () => {} }),
                });
                console.error(err);
            });
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="grow p-4 dark:bg-gray-900 dark:text-white">
            <Alert message={alert.message} type={alert.type} onClose={alert.onClose} />
            <h1 className="text-2xl font-bold mb-4 text-center">Product CRUD</h1>
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price || ""}
                            onChange={handleInputChange}
                            step="1"
                            min="0"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={form.description || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status || "available"}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        >
                            <option value="available">Available</option>
                            <option value="out_of_stock">Out of Stock</option>
                            <option value="coming_soon">Coming Soon</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            <input
                                type="checkbox"
                                name="showDiscount"
                                checked={showDiscount}
                                onChange={() => setShowDiscount(!showDiscount)}
                                className="mr-2"
                            />
                            Add Discount
                        </label>
                    </div>
                    {showDiscount && (
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Discount %
                            </label>
                            <input
                                type="number"
                                name="discount"
                                value={form.discount || ""}
                                onChange={handleInputChange}
                                step="1"
                                min="0"
                                max="100"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        {form.id ? "Update" : "Add"} Product
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                Name
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                Price
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                Description
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                Status
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                Discount
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
                        {products?.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {(product.price / 100).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.description || "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.discount ?  product.discount + " %" : "-"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-500 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                    <FaArrowLeft className="mr-2" /> Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                    Next <FaArrowRight className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default ProductCrud;
