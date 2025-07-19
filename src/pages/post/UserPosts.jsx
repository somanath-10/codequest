import React, { useEffect, useState } from 'react';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    const userId =  JSON.parse(localStorage.getItem("Profile"))?.existingUser?._id;
console.log("user",userId)
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/post/user/${userId}`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.userresponse);
        } else {
          console.error("Failed to load posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading posts...</div>;
  }

  if (!posts.length) {
    return <div className="text-center mt-10 text-gray-500">No posts available.</div>;
  }


const deletePost = async (postId) => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {
    const res = await fetch(`http://localhost:5000/post/user/delete/${postId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (data.success) {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } else {
      alert("Failed to delete post: " + data.message);
    }
  } catch (err) {
    console.error("Error deleting post:", err);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-center">User's Posts</h1>

      {posts && posts.map((post) => (
        <div key={post._id} className="relative bg-white p-4 rounded-lg shadow-md">
            <button
                onClick={() => deletePost(post._id)}
                className="absolute top-1 left-[650px] text-red-600 hover:text-red-800 font-bold text-sm"
            >
                Delete
            </button>
          {post.media && (
            <img
              src={post.media.startsWith('http') ? post.media : `/uploads/${post.media}`}
              alt="Post media"
              className="w-full h-auto rounded-md mb-4"
            />
          )}

          <p className="text-lg font-semibold mb-2">{post.caption || 'No caption'}</p>
          <p className="text-sm text-gray-500 mb-2">
            Created at: {new Date(post.createdAt).toLocaleString()}
          </p>

          <div className="mb-2">
            <p className="font-medium">Likes : {post.likes.length}</p>
            {/* <ul className="list-disc list-inside text-sm text-gray-700">
              {post.likes.map((user) =>
                user?.name ? <li key={user._id}>{user.name}</li> : null
              )}
            </ul> */}
          </div>

          <div>
            <p className="font-medium">Comments ({post.comments.length}):</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {post.comments.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.userId?.name || 'Unknown'}:</strong> {comment.text}
                </li>
              ))}
            </ul>
          </div>


        </div>
      ))}
    </div>
  );
};

export default UserPosts;
