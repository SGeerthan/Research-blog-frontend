const PostCard = ({ post }) => {
  const BACKEND_BASE = "https://research-blog-backend-4b6h.vercel.app";

  const resolveUrl = (maybeRelative) => {
    const raw = typeof maybeRelative === "string" ? maybeRelative : (maybeRelative?.url || "");
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw; // already absolute (e.g., Cloudinary)
    const normalized = raw.replace(/^\/+/, "");
    return `${BACKEND_BASE}/${normalized}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 hover:shadow-lg transition-shadow">
      <h2 className="text-primary font-bold text-lg sm:text-xl mb-2">{post.author}</h2>
      <p className="text-secondary text-sm sm:text-base leading-relaxed">{post.description}</p>
      
      {post.hyperlink && (
        <a
          href={post.hyperlink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline mt-3 block text-sm sm:text-base hover:text-green-600 transition-colors"
        >
          Read more
        </a>
      )}
      
      {post.images?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {post.images.map((img, idx) => {
            const src = resolveUrl(img);
            return (
              <img
                key={idx}
                src={src}
                alt={`post-image-${idx}`}
                className="w-full h-24 sm:h-32 object-cover rounded-md hover:opacity-90 transition-opacity"
              />
            );
          })}
        </div>
      )}
      
      {post.pdf && (
        <a
          href={resolveUrl(post.pdf)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline mt-3 block text-sm sm:text-base hover:text-blue-800 transition-colors"
        >
          Download PDF
        </a>
      )}
    </div>
  );
};

export default PostCard;
