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
      // console.log(response);
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
      <div className="text-green-600 font-bold text-xl text-center">
        Page is loading...
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
    <div className="post-list bg-[#2f3136] rounded-lg p-5 w-full mx-auto">
      {posts.map((post) => (
        <div
          onClick={() => handleClick(post.id)}
          key={post.id}
          className="post-item bg-[#40444b] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#4f545c] cursor-pointer"
        >
          <h3 className="post-title text-lg font-bold text-white m-0">
            {post.title}
          </h3>
          <p className="post-body text-sm text-[#b9bbbe] mt-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsTraditional;
