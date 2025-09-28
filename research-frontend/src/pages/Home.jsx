import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full">
      <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center sm:text-left">Research Papers</h1>
      <div className="grid-responsive">
        {posts.map(post => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
