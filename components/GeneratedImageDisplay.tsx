
import React, { useEffect, useState } from 'react';

interface GeneratedImageDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
  "Reticulating splines...",
  "Adjusting the lighting...",
  "Polishing the pixels...",
  "AI is working its magic...",
  "Composing the perfect shot...",
  "Applying finishing touches...",
];

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({
  originalImage,
  generatedImage,
  isLoading,
  error,
}) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setCurrentMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);
  
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'ai-headshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
          <p className="mt-4 text-lg font-semibold text-gray-300">Generating your headshot</p>
          <p className="text-gray-400 transition-opacity duration-500">{currentMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <svg className="w-12 h-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-lg font-semibold text-red-300">An Error Occurred</p>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      );
    }

    if (generatedImage) {
      return (
        <div className="flex flex-col items-center h-full">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Your AI Headshot is Ready!</h3>
          <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <img src={generatedImage} alt="Generated Headshot" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={handleDownload}
            className="mt-6 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download
          </button>
        </div>
      );
    }

    if (originalImage) {
       return (
        <div className="flex flex-col items-center h-full">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Original Photo</h3>
          <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <img src={originalImage} alt="Original selfie" className="w-full h-full object-cover" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <p className="text-lg font-semibold">Your generated headshot will appear here</p>
        <p className="text-sm">Upload a photo and choose a style to get started.</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
        {renderContent()}
    </div>
  );
};
