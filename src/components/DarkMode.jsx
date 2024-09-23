import React from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

const DarkModeToggle = () => {
    // Check local storage or default to system preference
    const [dark, setDark] = React.useState(() => {
        if (localStorage.theme === 'dark') {
            return true;
        } else if (localStorage.theme === 'light') {
            return false;
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    });

    const darkModeHandler = () => {
        setDark(!dark);
        if (!dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark'); // Save to localStorage
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light'); // Save to localStorage
        }
    };

    return (
            <button onClick={darkModeHandler}>
                {
                    dark ? <IoSunny className="text-white" /> : <IoMoon className="text-black"/>
                }
            </button>
    );
}

export default DarkModeToggle;
