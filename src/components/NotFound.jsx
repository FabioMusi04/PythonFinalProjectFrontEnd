import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <img 
                    src="https://via.placeholder.com/400x300?text=Lost+in+Space" 
                    alt="404 Not Found Illustration" 
                    className="mx-auto mb-6 w-72 h-48 object-contain"
                />

                <h1 className="text-9xl font-bold text-blue-800 dark:text-blue-400 animate-bounce">404</h1>
                <p className="text-2xl font-medium text-gray-600 dark:text-gray-300 mt-4">Page Not Found</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Sorry, the page you are looking for does not exist.
                </p>

                <div className="mt-8 flex justify-center space-x-4">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
                    >
                        Go to Home
                    </a>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-block px-6 py-3 bg-gray-600 dark:bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 shadow-md transition-transform transform hover:scale-105"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
