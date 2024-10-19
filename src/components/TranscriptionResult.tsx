import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  image?: string;
}

interface TranscriptionResultProps {
  segments: TranscriptionSegment[];
  onImageAttach: (segmentIndex: number, imageUrl: string) => void;
}

const TranscriptionResult: React.FC<TranscriptionResultProps> = ({ segments, onImageAttach }) => {
  const [expandedSegment, setExpandedSegment] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleImageUpload = (segmentIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageAttach(segmentIndex, e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Transcription Result</h2>
      <div className="space-y-4">
        {segments.map((segment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {formatTime(segment.start)} - {formatTime(segment.end)}
              </span>
              <button
                onClick={() => setExpandedSegment(expandedSegment === index ? null : index)}
                className="text-blue-500 hover:text-blue-700"
              >
                {expandedSegment === index ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <p className={`whitespace-pre-wrap ${expandedSegment === index ? '' : 'line-clamp-2'}`}>
              {segment.text}
            </p>
            {expandedSegment === index && (
              <div className="mt-2">
                {segment.image ? (
                  <img src={segment.image} alt="Attached" className="max-w-full h-auto rounded" />
                ) : (
                  <div className="flex items-center mt-2">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptionResult;