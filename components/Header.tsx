
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3">
            <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              AI Headshot Photographer
            </h1>
        </div>
        <p className="mt-2 text-lg text-gray-400">
          Transform your selfie into a professional headshot in seconds.
        </p>
      </div>
    </header>
  );
};
