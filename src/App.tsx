import React, { useState } from 'react';
import { Upload, Mic, FileAudio, Clock, Image as ImageIcon } from 'lucide-react';
import FileUpload from './components/FileUpload';
import TranscriptionProgress from './components/TranscriptionProgress';
import TranscriptionResult from './components/TranscriptionResult';
import ErrorMessage from './components/ErrorMessage';
import FileList from './components/FileList';

interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  image?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  // ... (rest of the component remains the same)

  const handleProcessFiles = async () => {
    if (files.length === 0) {
      setError("Please upload at least one file before processing.");
      return;
    }
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setTranscription(data.segments);
    } catch (err) {
      setError("An error occurred while processing the file.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ... (rest of the component remains the same)
}

export default App;