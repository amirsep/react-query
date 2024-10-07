import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostsTraditional = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      setPosts(response?.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
        Error: {isError}
      </div>
    );
  }

  return (
    <div className="post-list rounded-lg p-5 w-full mx-auto">
      {posts.map((post) => (
        <div
          onClick={() => handleClick(post.id)}
          key={post.id}
          className="post-item bg-[#282a36] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#3b3e4a] cursor-pointer"
        >
          <h3 className="post-title text-lg font-bold text-white m-0">
            {post.title}
          </h3>
          <p className="post-body text-sm text-[#b9bbbe] ">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsTraditional;
