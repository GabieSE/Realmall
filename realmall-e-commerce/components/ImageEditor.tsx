
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { geminiService } from '../services/geminiService';
import Button from './Button';

interface ImageEditorProps {
  product: Product;
  onClose: () => void;
  onApply: (newImageUrl: string) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ product, onClose, onApply }) => {
  const [currentImage, setCurrentImage] = useState(product.image);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([product.image]);

  const handleEdit = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { data, mimeType } = await geminiService.urlToBase64(currentImage);
      const editedUrl = await geminiService.editImage(data, mimeType, prompt);
      setCurrentImage(editedUrl);
      setHistory(prev => [...prev, editedUrl]);
      setPrompt('');
    } catch (err) {
      console.error(err);
      setError('AI could not process this request. Please try a different prompt.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentImage(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto">
        {/* Image Preview Area */}
        <div className="relative flex-1 bg-stone-100 flex items-center justify-center p-8">
          <img 
            src={currentImage} 
            alt="Product Preview" 
            className="max-h-[60vh] object-contain rounded-xl shadow-lg transition-all duration-500"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
              <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-4"></div>
              <p className="font-medium text-stone-900 animate-pulse">Nano Banana is reimagining your style...</p>
            </div>
          )}
          
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleUndo} 
                disabled={history.length <= 1 || isProcessing}
                className="bg-white shadow-sm"
              >
                Undo
              </Button>
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 bg-white px-3 py-1 rounded-full shadow-sm">
              AI Canvas
            </span>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="w-full md:w-80 p-8 flex flex-col justify-between border-l border-stone-100">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold">Visionary Studio</h2>
                <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Powered by Gemini 2.5 Flash</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Refinement Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Add a vintage sepia filter' or 'Place it on a marble stand with sunset lighting'"
                  className="w-full h-32 p-4 text-sm border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none transition-all placeholder:text-stone-300"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Quick Presets</p>
                <div className="flex flex-wrap gap-2">
                  {['Retro Vibe', 'Studio Light', 'Beach Scene', 'Golden Hour', 'Noir'].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setPrompt(`Apply a ${preset.toLowerCase()} effect to this image.`)}
                      className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <Button 
              className="w-full" 
              onClick={handleEdit} 
              isLoading={isProcessing}
              disabled={!prompt.trim() || isProcessing}
            >
              Generate Design
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => onApply(currentImage)}
              disabled={isProcessing}
            >
              Keep Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
