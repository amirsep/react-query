import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = () => {
  return axios.get(`http://localhost:4000/fruits`);
};

const InfiniteQueries = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
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
      {data?.data.map((item) => (
        <div
          key={item.id}
          className="post-item bg-[#40444b] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#4f545c] cursor-pointer"
        >
          <h3 className="post-title text-lg font-bold text-white m-0">
            {item.name}
          </h3>
          <p className="post-body text-sm text-[#b9bbbe] mt-2">ID: {item.id}</p>
        </div>
      ))}
    </div>
  );
};

export default InfiniteQueries;
