import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

// GET Method
const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

// POST Method
const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const PostsRQ = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: false,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  const { mutate } = useMutation({
    mutationFn: addPost,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };
    mutate(post);
    setTitle("");
    setBody("");
  };

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
      <form
        onSubmit={handleSubmit}
        className="bg-[#282a36] p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            value={title}
            className="w-full px-4 py-2 border border-transparent rounded-lg bg-[#40444b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Body</label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post body"
            value={body}
            rows="4"
            className="w-full px-4 py-2 border border-transparent rounded-lg bg-[#40444b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-gray-700"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" px-6 py-2 text-white font-bold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Post
          </button>
        </div>
      </form>

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
            className="bg-[#282a36] mt-4 rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#3b3e4a] cursor-pointer"
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
