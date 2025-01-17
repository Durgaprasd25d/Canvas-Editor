import React from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { Image } from "../types";

interface ImageCardProps {
  image: Image;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const navigate = useNavigate();

  const handleAddCaptions = () => {
    navigate(`/edit/${image.id}`, { state: { image } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video">
        {image.src.large ? (
          <img
            src={image.src.large}
            alt={image.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Error loading image:", e);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">By {image.photographer}</p>
        <button
          onClick={handleAddCaptions}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white py-2 px-4 rounded-md hover:from-blue-900 hover:to-blue-600 transition-all"
        >
          Add Captions
        </button>
      </div>
    </div>
  );
};