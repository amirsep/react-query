import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

// Function to fetch fruits with dynamic page limit
const fetchFruits = ({ pageParam = 1, queryKey }) => {
  const limit = queryKey[1]; // Accessing dynamic limit from queryKey
  return axios.get(
    `http://localhost:4000/fruits?_limit=${limit}&_page=${pageParam}`
  );
};

const InfiniteQueries = () => {
  const [limit, setLimit] = useState(4); // State for dynamic limit

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["fruits", limit], // Pass limit as part of the queryKey
      queryFn: fetchFruits,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 5) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return (
      <div className="text-white font-bold text-xl text-center">
        Page is loading...
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
    <div className="post-list bg-[#2f3136] rounded-lg p-5 w-full mx-auto">
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
              <p className="post-body text-sm text-[#b9bbbe] mt-2">
                ID: {fruit.id}
              </p>
            </div>
          );
        });
      })}

      <button
        onClick={fetchNextPage}
        disabled={!hasNextPage}
        className={`px-6 py-3  text-white font-bold rounded-lg shadow-md
          ${
            !hasNextPage
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          }`}
      >
        Load More..
      </button>
    </div>
  );
};

export default InfiniteQueries;
