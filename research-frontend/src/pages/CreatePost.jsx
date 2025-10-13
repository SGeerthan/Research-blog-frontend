import { useState } from "react";
import { createPost } from "../api/posts";
import Loader from "../components/Loader";

const CreatePost = ({ token }) => {
  const [topic, setTopic] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [hyperlink, setHyperlink] = useState("");
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("topic", topic);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("hyperlink", hyperlink);

      // ✅ Append multiple images
      images.forEach((file) => {
        formData.append("images", file);
      });

      if (pdf) {
        formData.append("pdf", pdf);
      }

      await createPost(formData, token);
      alert("✅ Post created successfully!");

      // Reset form
      setTopic("");
      setAuthor("");
      setDescription("");
      setHyperlink("");
      setImages([]);
      setPdf(null);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error occurred while creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {loading && <Loader />}

      <div className="form-container">
        <h2 className="text-primary text-xl sm:text-2xl mb-6 text-center">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          ></textarea>

          <input
            type="text"
            placeholder="Hyperlink (optional)"
            value={hyperlink}
            onChange={(e) => setHyperlink(e.target.value)}
            className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* IMAGE UPLOAD */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images (optional)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-secondary rounded-md text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-blue-700"
              />

              {images.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">
                    {images.length} image(s) selected
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((file, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PDF UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF (optional)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                className="w-full p-2 border border-secondary rounded-md text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-3 rounded-md text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
