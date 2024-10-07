import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PostDetailsRQ = () => {
  let { postId } = useParams();

  const fetchPostDetails = (postId) => {
    return axios.get(`http://localhost:4000/posts/${postId}`);
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostDetails(postId),
  });

  const { title, body } = data?.data || {};

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
      <div className="flex justify-center items-center min-h-screen bg-red-100">
        <div className="text-lg font-semibold text-red-600">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-3xl w-full rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-white border-b-4 border-blue-500 pb-4">
          {title}
        </h1>
        <p className="text-xl text-white leading-relaxed mb-4 ">{body}</p>
        <Link to="/">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostDetailsRQ;
