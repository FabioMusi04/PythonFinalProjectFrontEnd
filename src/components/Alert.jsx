import { useEffect } from "react";
import PropTypes from "prop-types";

const Alert = ({ type, message, onClose }) => {
  const alertType = {
    success:
      "bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300",
    error:
      "bg-red-100 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-300",
    warning:
      "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-300",
    info: "bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-300",
  };

  useEffect(() => {
    if (type !== "" && message !== "") {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [type, message, onClose]);

  return (
    <div className="flex justify-center items-center">
      {type !== "" && message !== "" && (
        <div className={`border-l-4 p-4 ${alertType[type]} rounded mb-5 w-full max-w-md`} role="alert">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
              <p>{message}</p>
            </div>
            <button onClick={onClose} className="text-xl font-bold ml-4">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
