import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-600 px-4">
              Функционал будет добавлен
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;