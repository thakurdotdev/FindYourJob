import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl">
        <div className="flex-1 mb-6 md:mb-0 md:pr-8 flex flex-col items-center md:items-start">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
            Face<span className="text-gray-800">Gram</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-md text-justify">
            Oops! Looks like the page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
        <div className="flex-1 mt-6 md:mt-0 flex items-center justify-center">
          <LazyImage
            src="/facegram.png"
            alt="FaceGram"
            aspectRatio="1:1"
            height="350px"
            width="350px"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
