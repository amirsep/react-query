import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam = 1, queryKey }) => {
  const limit = queryKey[1]; // Accessing dynamic limit from queryKey
  return axios.get(
    `http://localhost:4000/fruits?_limit=${limit}&_page=${pageParam}`
  );
};

const InfiniteQueryByScroll = () => {
  const [limit, setLimit] = useState(10); // State for dynamic limit

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits", limit], // Pass limit as part of the queryKey
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 15) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
    <div className="post-list bg-[#2f3136] rounded-lg p-5 w-full mx-auto">
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
      <div
        ref={ref}
        className="flex items-center justify-center mt-6 py-4 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        {isFetchingNextPage && (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-3 text-blue-500"
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
            Loading...
          </>
        )}
      </div>

      {/* <div ref={ref}> {isFetchingNextPage && "Loading..."}</div> */}
    </div>
  );
};

export default InfiniteQueryByScroll;
