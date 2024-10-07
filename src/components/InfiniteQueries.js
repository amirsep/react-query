import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = ({ pageParam = 1, queryKey }) => {
  const limit = queryKey[1]; // Accessing dynamic limit from queryKey
  return axios.get(
    `http://localhost:4000/fruits?_limit=${limit}&_page=${pageParam}`
  );
};

const InfiniteQueries = () => {
  const [limit, setLimit] = useState(6); // State for dynamic limit

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, // Tracks loading state for the next page
  } = useInfiniteQuery({
    queryKey: ["fruits", limit], // Pass limit as part of the queryKey
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 10) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
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
    <div className="post-list rounded-lg  w-full mx-auto">
      <div className="mb-4">
        <label className="text-white font-bold mr-2">Items per page:</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-3 py-2 rounded-md bg-[#40444b] text-white"
          min="1"
        />
      </div>

      {data.pages.map((page) => {
        return page?.data.map((fruit) => {
          return (
            <div
              key={fruit.id}
              className="post-item bg-[#40444b] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#4f545c] cursor-pointer"
            >
              <h3 className="post-title text-lg font-bold text-white m-0">
                {fruit.name}
              </h3>
              <p className="post-body text-sm text-[#b9bbbe]">ID: {fruit.id}</p>
            </div>
          );
        });
      })}
      <div className="flex justify-center ">
        <button
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage} // Disable when fetching next page
          className={`px-6 py-3  text-white font-bold rounded-lg shadow-md
          ${
            !hasNextPage || isFetchingNextPage
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          }`}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More.."}
          {/* Show loading message */}
        </button>
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center mt-4">
          <svg
            className="animate-spin h-6 w-6 text-blue-500 mr-3"
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
          <span className="text-white font-bold">Loading more items...</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteQueries;
