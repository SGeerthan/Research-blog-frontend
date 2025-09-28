import { ClipLoader } from "react-spinners";

const Loader = ({ loading = true, size = 50, color = "#1E40AF" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default Loader;
