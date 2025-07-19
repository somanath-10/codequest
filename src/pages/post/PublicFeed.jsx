import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar";
   import moment from 'moment';

const PublicFeed = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({}); // Track comment input per post
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("Profile"));

  // Fetch posts on mount
  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/post/allposts`, {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.response);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load public feed");
    }
  };
  useEffect(() => {

    fetchPosts();
  }, []);

  // Like a post
  const likePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/post/like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify({
          userId: token?.existingUser._id,
        }),
      });
      const data = await res.json();
      console.log("Like Response:", data);
      fetchPosts();
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  // Comment on a post
  const commentOnPost = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText) return;

    try {
      const res = await fetch(`http://localhost:5000/post/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify({
          userId: token?.existingUser._id,
          text: commentText,
        }),
      });

      const data = await res.json();
      console.log("Comment Response:", data);

      // Clear input after commenting
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  return (

<div className="flex min-h-screen">
  <div className="max-w-64">
    <Leftsidebar />
  </div>

      <div className="max-w-2xl mx-auto p-4 flex-1 px-6 py-10 md:ml-[250px]">
        
        <h2 className="text-xl font-bold mb-4">Public Space</h2>
        <button onClick={() => navigate("/post/create")} className="mb-4 underline text-blue-600">
          Publish a Post
        </button>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="border rounded mb-4 p-4">
              <p className="font-semibold mb-2">{post.caption}</p>
              <img src={post.media} alt="Post" width={500} className="mb-2 rounded" />

              <div className="flex items-center space-x-4 mb-2">
                <button className="text-blue-500" onClick={() => likePost(post._id)}>
                  Like
                </button>
                <span>Likes: {post.likes.length}</span>

                <button
    className="text-green-600 hover:underline"
    onClick={() => {
      const url = `${window.location.origin}/post/${post._id}`;
      navigator.clipboard.writeText(url);
      alert("Post link copied to clipboard!");
    }}
  >
    Share
  </button>

              </div>

              <div className="mb-2">
                <input
                  type="text"
                  name="comment"
                  placeholder="Enter a comment"
                  value={commentInputs[post._id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({ ...prev, [post._id]: e.target.value }))
                  }
                  className="border px-2 py-1 mr-2"
                />
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => commentOnPost(post._id)}
                >
                  Comment
                </button>
              </div>

              <div className="mt-2">
                <h4 className="font-medium">Comments:</h4>
                {post.comments.length === 0 ? (
                  <p className="text-sm text-gray-500">No comments yet</p>
                ) : (
                  post.comments.map((comment) => (
                      <div key={comment._id} className="text-sm border-b py-1">
                        <span className="font-semibold text-blue-600 mr-2">
                          {comment?.userId?.name}
                        </span>
                        
                        <span>{comment.text}</span>

                        <span className="text-xs text-gray-400 ml-2">
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>

                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
  
    </div>
  );
};

export default PublicFeed;
