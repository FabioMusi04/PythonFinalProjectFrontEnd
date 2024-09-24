import { useState, useEffect } from 'react';
import axiosInstance from '../axios';

const ProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ id: null, name: '', price: '', description: '', image: '', status: '', discount: '' });
    const restaurantId = 1;

    useEffect(() => {
        axiosInstance.get(`/products/${restaurantId}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.id) {
            form.restaurant_id = restaurantId;
            axiosInstance.put(`/products/${form.id}`, form)
                .then((res) => {
                    setProducts(products.map((product) => (product.id === form.id ? res.data : product)));
                    console.log('Product updated:', res.data);
                })
                .catch((err) => console.error(err));
            
        } else {
            form.restaurant_id = restaurantId;
            axiosInstance.post(`/products`, form)
                .then((res) => {
                    setProducts([...products, res.data.product.new_product]);
                    console.log('Product created:', res.data);
                })
                .catch((err) => console.error(err));
        }
        setForm({ id: '', name: '', price: '', description: '', image: '', status: '', discount: '' });
    };

    const handleEdit = (product) => {
        setForm({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description || '',
            image: product.image || '',
            status: product.status,
            discount: product.discount
        });
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const hImageandleInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setForm({ ...form, image: reader.result });
        };
    };

    return (
        <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Product CRUD</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={hImageandleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                    {form.id ? 'Update' : 'Add'} Product
                </button>
            </form>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Discount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.price / 100}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.description || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.image || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.discount || "-"}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-500 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductCrud;