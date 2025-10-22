
import React from 'react';
import { HEADSHOT_STYLES } from '../constants';
import type { HeadshotStyle } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface StyleSelectorProps {
  selectedStyle: HeadshotStyle | null;
  onStyleSelect: (style: HeadshotStyle | null) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isGenerateDisabled: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleSelect,
  customPrompt,
  onCustomPromptChange,
  onGenerate,
  isGenerating,
  isGenerateDisabled
}) => {
  const handleStyleClick = (style: HeadshotStyle) => {
    onStyleSelect(style.id === selectedStyle?.id ? null : style);
    onCustomPromptChange('');
  };
  
  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onCustomPromptChange(e.target.value);
      if (selectedStyle) {
          onStyleSelect(null);
      }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
        <span className="bg-indigo-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">2</span>
        Choose a Style or Describe an Edit
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {HEADSHOT_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => handleStyleClick(style)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedStyle?.id === style.id ? 'border-indigo-500 scale-105' : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <img src={style.thumbnailUrl} alt={style.name} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2">
              <span className="text-white text-sm font-semibold text-center">{style.name}</span>
            </div>
            {selectedStyle?.id === style.id && (
                <div className="absolute top-1 right-1 bg-indigo-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
            )}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <textarea
          value={customPrompt}
          onChange={handleCustomPromptChange}
          placeholder="Or, describe your edit (e.g., 'Add a retro filter', 'Change the background to a modern office')"
          className="w-full bg-gray-900 border-2 border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 text-gray-200 resize-none"
          rows={3}
        />
        <div className="absolute bottom-3 right-3 text-gray-500 text-xs">
          {customPrompt.length} / 200
        </div>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isGenerateDisabled}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Headshot
          </>
        )}
      </button>
    </div>
  );
};
