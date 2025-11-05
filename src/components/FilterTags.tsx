import React from "react";

interface FilterTagsProps {
  title?: string;
}

export const FilterTags: React.FC<FilterTagsProps> = ({ title = "" }) => {
  const handleClose = () => {
    alert("Close button clicked");
  };

  return (
    <div className="flex gap-2 border border-gray-300 items-center p-2 bg-white text-gray-700 rounded-full text-xs hover:shadow-md hover:border-blue-300">
      {title}
      <button
        className="cursor-pointer group w-3.5 h-3.5 flex items-center justify-center rounded-full"
        onClick={handleClose}
      >
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-gray-500 group-hover:fill-red-500 transition-colors duration-200"
        >
          <path d="M7.99823 6.82575L11.1222 3.70249C11.395 3.42968 11.395 2.9869 11.1222 2.71339C10.848 2.44059 10.4052 2.44059 10.1324 2.71339L7.00914 5.83596L3.88657 2.71409C3.61376 2.44129 3.17028 2.44129 2.89747 2.71409C2.62467 2.9869 2.62467 3.42968 2.89747 3.70249L6.02004 6.82575L2.97372 9.87138C2.70092 10.1442 2.70092 10.5877 2.97372 10.8612C3.24792 11.134 3.69071 11.134 3.96421 10.8612L7.00984 7.81485L10.0562 10.8612C10.329 11.134 10.7724 11.134 11.0453 10.8612C11.3181 10.5884 11.3181 10.1449 11.0453 9.87138L7.99823 6.82575Z" />
        </svg>
      </button>
    </div>
  );
};
