import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "./Alert";

function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("owner@example.com");
  const [password, setPassword] = useState("ownerpassword");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    axiosInstance
      .post("/login", { email, password })
      .then((response) => {
        console.log(response);
        if (response.status <= 201 && response.status >= 300) {
          throw new Error(response.detail);
        }

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setUser(response.data.user);

        setAlert({
          type: "success",
          message: "Login successful",
          onClose: () => {
            navigate("/");
          },
        });
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: error.response.data.detail || error.message,
          onClose: () => {
            setAlert({ type: "", message: "", onClose: () => {} });
            setEmail("");
            setPassword("");
          },
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [alert, setAlert] = useState({
    type: "",
    message: "",
    onClose: () => {},
  });

  return (
    <div className="relative grow justify-center bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 px-6">
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={alert.onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="dark:text-gray-300 text-black-300"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            Log In
          </button>
          <div className="text-end mt-4">
            <a href="/register" className="text-indigo-600 hover:underline">
              You don&apos;t have an account? Register HERE
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
