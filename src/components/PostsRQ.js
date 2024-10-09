import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

// DELETE Method
const deletePost = (postId) => {
  return axios.delete(`http://localhost:4000/posts/${postId}`);
};

// PUT (Update) Method
const updatePost = (updatedPost) => {
  return axios.put(
    `http://localhost:4000/posts/${updatedPost.id}`,
    updatedPost
  );
};

const PostsRQ = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const queryClient = useQueryClient();

  // Fetch Posts
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Add Post
  const { mutate: addPostMutation, isLoading: isPosting } = useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPostData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...newPost, id: String(oldQueryData?.data?.length + 1) },
          ],
        };
      });
      return { previousPostData };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context.previousPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // Delete Post
  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // Update Post
  const { mutate: updatePostMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // Handle Post Submit (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };

    if (editMode) {
      updatePostMutation({ ...post, id: currentPostId });
      setEditMode(false);
      setCurrentPostId(null);
    } else {
      addPostMutation(post);
    }

    setTitle("");
    setBody("");
  };

  // Handle Post Edit
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditMode(true);
    setCurrentPostId(post.id);
  };

  // Handle Post Delete
  const handleDelete = (postId) => {
    deletePostMutation(postId);
  };

  if (isLoading || isFetching) {
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
        className="p-2 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block  text-white font-medium mb-2">Title</label>
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
            rows="2"
            className="w-full px-4 py-2 border border-transparent rounded-lg bg-[#40444b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-gray-700"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-2 text-white font-bold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 ${
              isPosting || isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPosting || isUpdating}
          >
            {isPosting || isUpdating
              ? editMode
                ? "Updating..."
                : "Posting..."
              : editMode
              ? "Update Post"
              : "Add Post"}
          </button>
        </div>
      </form>

      <div className="flex justify-center my-2">
        <button
          className={`px-6 py-2  text-white font-bold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 ${
            isFetching && "opacity-50 cursor-not-allowed"
          }`}
          onClick={refetch}
          disabled={isFetching}
        >
          {isFetching ? "Fetching..." : "Fetch Posts"}
        </button>
      </div>

      {data?.data?.map((post) => (
        <div
          key={post.id}
          className="bg-[#282a36] mt-4 rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#3b3e4a]"
        >
          <h3 className="post-title text-lg font-bold text-white">
            {post.title}
          </h3>
          <p className="post-body text-sm text-[#b9bbbe] ">{post.body}</p>
          <div className="flex justify-end space-x-4 mt-2">
            <button
              onClick={() => handleEdit(post)}
              className="text-blue-400 font-bold hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-500 font-bold hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsRQ;
