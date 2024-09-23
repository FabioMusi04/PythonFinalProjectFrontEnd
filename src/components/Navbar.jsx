import React, { useState } from 'react';
import DarkModeToggle from './DarkMode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black dark:text-white text-lg font-bold">MyApp</div>

        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 mr-4"
            >
              Home
            </a>
            <a
              href="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 mr-4"
            >
              Login
            </a>
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 mr-4"
            >
              Contact
            </a>
          </div>

          <div className="mt-4 lg:mt-0">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
