import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600">
          Функционал будет добавлен
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;