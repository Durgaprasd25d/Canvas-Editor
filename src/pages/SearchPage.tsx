import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ImageCard } from '../components/ImageCard';
import { UserInfo } from '../components/UserInfo';
import { searchImages } from '../services/api';
import { Image } from '../types';
import { Loader2 } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchImages(query);
      setImages(response.photos);
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* User Info Section */}
        <div className="flex justify-start mb-8">
          <UserInfo />
        </div>

        {/* Search Section */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Canvas Editor
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-center mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          /* Image Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;