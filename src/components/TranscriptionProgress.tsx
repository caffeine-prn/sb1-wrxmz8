import React from 'react';

interface TranscriptionProgressProps {
  progress: number;
}

const TranscriptionProgress: React.FC<TranscriptionProgressProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Transcription in Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center mt-2">{progress}% Complete</p>
    </div>
  );
};

export default TranscriptionProgress;