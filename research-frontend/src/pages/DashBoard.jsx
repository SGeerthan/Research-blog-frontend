import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "../api/posts";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

const Dashboard = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [hyperlink, setHyperlink] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    try {
      await deletePost(id, token);
      alert("Post deleted!");
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setAuthor(post.author);
    setDescription(post.description);
    setHyperlink(post.hyperlink);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    setLoading(true);
    try {
      await updatePost(selectedPost._id, { author, description, hyperlink }, token);
      alert("Post updated!");
      setModalOpen(false);
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loading && <Loader />}
      <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center sm:text-left">Admin Dashboard</h1>
      <div className="mb-6 text-center sm:text-left">
        <Link
          to="/dashboard/create-post"
          className="bg-accent text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-green-600 transition-colors inline-block"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid-responsive">
        {posts.map((post) => (
          <div key={post._id} className="relative">
            <PostCard post={post} />
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-600 text-white px-3 py-2 rounded-md text-sm sm:text-base hover:bg-red-700 transition-colors flex-1 sm:flex-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-primary text-lg sm:text-xl font-bold mb-4">Update Post</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
                className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
              <input
                type="text"
                value={hyperlink}
                onChange={(e) => setHyperlink(e.target.value)}
                placeholder="Hyperlink"
                className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-400 text-white text-sm sm:text-base hover:bg-gray-500 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-md bg-primary text-white text-sm sm:text-base hover:bg-blue-700 transition-colors order-1 sm:order-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
