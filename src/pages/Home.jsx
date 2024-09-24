const Home = () => {
    return (
        <div className="relative grow justify-center bg-gray-50 dark:bg-gray-900 py-6 sm:py-12">
            <div className="relative bg-white dark:bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10">
                <main>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Welcome to Our Application</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Discover the best features and tools to enhance your experience. Join us and start your journey today!</p>
                        <a href="/login" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-300">Get Started</a>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Feature One</h3>
                                <p className="text-gray-600 dark:text-gray-400">Description of feature one. A powerful tool to help you achieve your goals.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Feature Two</h3>
                                <p className="text-gray-600 dark:text-gray-400">Description of feature two. Enhance your productivity with this amazing feature.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Feature Three</h3>
                                <p className="text-gray-600 dark:text-gray-400">Description of feature three. A must-have for anyone looking to improve their workflow.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Feature Four</h3>
                                <p className="text-gray-600 dark:text-gray-400">Description of feature four. Unlock new possibilities with this innovative feature.</p>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="mt-10 text-center">
                    <p className="text-gray-600 dark:text-gray-400">© 2023 App Home. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;