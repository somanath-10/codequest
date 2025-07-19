import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/post/${postId}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.post);
        } else {
          setError(data.message || "Post not found");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Server error");
      }
    };

    fetchPost();
  }, [postId]);

  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;
  if (!post) return <div className="text-center mt-4">Loading...</div>;

  return (

    <div className="flex-1 px-6 py-10 md:ml-[250px]">

      <div className="max-w-2xl mx-auto p-4 ">
        <h2 className="text-xl font-bold mb-4">{post.caption}</h2>
        <img src={post.media} alt="Post" className="rounded mb-4" />
        <p className="text-sm text-gray-600 mb-2">Posted by: {post.userId?.name}</p>
        <p className="text-xs text-gray-500 mb-4">{moment(post.createdAt).fromNow()}</p>

        <div className="mb-4">
          <h3 className="font-semibold">Likes: {post.likes.length}</h3>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Comments:</h4>
          {post.comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            post.comments.map((c) => (
              <div key={c._id} className="border-b py-1 text-sm">
                <span className="font-medium text-blue-600">{c.userId?.name}</span>{" "}
                <span>{c.text}</span>
                <span className="text-xs text-gray-400 ml-2">{moment(c.createdAt).fromNow()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
