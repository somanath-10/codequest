import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostPicture() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const token = JSON.parse(localStorage.getItem("Profile"))?.existingUser?._id;
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    if (!caption.trim()) {
      alert("Please enter a caption.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("postpicture", image);
      formData.append("caption", caption);
      formData.append("userId", token);

      const response = await fetch("http://localhost:5000/post/create", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImageUrl(data.mediaUrl || data.media);
        alert("Upload successful!");
        navigate("/post");
      } else {
        alert("Upload failed: " + (data.message ,"or else add more friends"));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload error");
    }

    setUploading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Upload Image with Caption
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-4 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" className="w-full rounded shadow" />
        </div>
      )}

      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 px-4 rounded text-white font-semibold ${
          uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedImageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Uploaded Image</h3>
          <img src={uploadedImageUrl} alt="Uploaded" className="w-full rounded shadow mb-2" />
          <p className="text-sm text-gray-600">
            URL:{" "}
            <a href={uploadedImageUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {uploadedImageUrl}
            </a>
          </p>
          <p className="text-sm text-gray-800 mt-1">
            <b>Caption:</b> {caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default PostPicture;
