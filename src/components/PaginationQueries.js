import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits?_limit=5&_page=${pageId}`);
};

const PaginationQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white font-bold text-xl flex items-center space-x-3">
          <svg
            className="animate-spin h-6 w-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Page is loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 font-bold text-xl text-center">
        {error.message}
      </div>
    );
  }

  return (
    <div className="post-list rounded-lg p-5 w-full mx-auto">
      {data?.data.map((item) => (
        <div
          key={item.id}
          className="post-item bg-[#40444b] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#4f545c] cursor-pointer"
        >
          <h3 className="post-title text-lg font-bold text-white m-0">
            {item.name}
          </h3>
          <p className="post-body text-sm text-[#b9bbbe] ">ID: {item.id}</p>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className={`px-6 py-3  text-white font-bold rounded-lg shadow-md
            ${
              page === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            }`}
        >
          Prev Page
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data?.data.length < 4}
          className={`px-6 py-3  text-white font-bold rounded-lg shadow-md
            ${
              data?.data.length < 4
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            }`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PaginationQueries;
