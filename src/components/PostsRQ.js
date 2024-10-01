import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostsRQ = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
  });
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
        {error.message}
      </div>
    );
  }
  return (
    <div className="post-list bg-[#2f3136] rounded-lg p-5 w-full mx-auto">
      {data?.data?.map((post) => (
        <div
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

export default PostsRQ;
