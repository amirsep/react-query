import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
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
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="post-details-container">
      <div className="post-details-title">{title}</div>
      <div className="post-details-body">{body}</div>
    </div>
  );
};

export default PostDetails;
