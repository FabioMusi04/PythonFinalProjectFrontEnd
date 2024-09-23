import React from 'react';

const Loading = () => {
    return (
        <div className="grow flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 dark:border-blue-300"></div>
        </div>
    );
};

export default Loading;