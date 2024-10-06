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
      <div className="text-white font-bold text-xl text-center">
        Page is loading...
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
    <div className="post-list bg-[#2f3136] rounded-lg p-5 w-full mx-auto">
      <div className="flex justify-center my-4">
        <button
          className="px-6 py-3  text-white font-bold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={refetch}
        >
          Fetch Posts
        </button>
        <button className="ml-2 px-6 py-3  text-white font-bold rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
          <Link to={"/paginated-fruits"}>Fetch Fruits</Link>
        </button>
      </div>

      {data?.data?.map((post) => (
        <Link to={`/rq-posts/${post.id}`}>
          <div
            key={post.id}
            className="post-item bg-[#40444b] rounded-lg p-4 mb-2 transition-colors duration-300 hover:bg-[#4f545c] cursor-pointer"
          >
            <h3 className="post-title text-lg font-bold text-white m-0">
              {post.title}
            </h3>
            <p className="post-body text-sm text-[#b9bbbe] mt-2">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
