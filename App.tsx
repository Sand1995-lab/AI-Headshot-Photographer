
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { generateImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import type { HeadshotStyle } from './types';

export default function App() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File | null) => {
    setOriginalFile(file);
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalFile) {
      setError('Please upload an image first.');
      return;
    }

    const prompt = customPrompt || selectedStyle?.prompt;
    if (!prompt) {
      setError('Please select a style or enter a custom prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const base64Data = await fileToBase64(originalFile);
      const mimeType = originalFile.type;
      
      const generatedImageBase64 = await generateImage(base64Data, mimeType, prompt);
      
      if (generatedImageBase64) {
        setGeneratedImageUrl(`data:${mimeType};base64,${generatedImageBase64}`);
      } else {
        throw new Error('The API did not return an image. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalFile, selectedStyle, customPrompt]);

  const activePrompt = customPrompt || selectedStyle?.prompt || '';
  const isGenerateDisabled = !originalFile || !activePrompt || isLoading;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Panel: Controls */}
          <div className="flex flex-col gap-8 p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl shadow-gray-900/50">
            <ImageUploader onImageUpload={handleImageUpload} />
            {originalFile && (
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleSelect={setSelectedStyle}
                customPrompt={customPrompt}
                onCustomPromptChange={setCustomPrompt}
                onGenerate={handleGenerateClick}
                isGenerating={isLoading}
                isGenerateDisabled={isGenerateDisabled}
              />
            )}
          </div>

          {/* Right Panel: Display */}
          <div className="flex flex-col p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl shadow-gray-900/50">
            <GeneratedImageDisplay
              originalImage={originalFile ? URL.createObjectURL(originalFile) : null}
              generatedImage={generatedImageUrl}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
