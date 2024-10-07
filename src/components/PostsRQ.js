import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ = () => {
  const { isLoading, isError, error, data, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    enabled: false,
  });
  console.log(isLoading, isFetching);

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
      <div className="text-red-600 font-bold text-xl text-center ">
        {error.message}
      </div>
    );
  }
  return (
    <div className="rounded-lg  w-full mx-auto">
      <div className="flex justify-center my-2">
        <button
          className="px-6 py-2  text-white font-bold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={refetch}
        >
          Fetch Posts
        </button>
      </div>

      {data?.data?.map((post) => (
        <Link to={`/rq-posts/${post.id}`}>
          <div
            key={post.id}
            className="post-item bg-[#40444b] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#4f545c] cursor-pointer"
          >
            <h3 className="post-title text-lg font-bold text-white">
              {post.title}
            </h3>
            <p className="post-body text-sm text-[#b9bbbe] ">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
