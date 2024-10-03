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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
