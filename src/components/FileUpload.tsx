import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onError }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        onError("File size exceeds 100MB limit.");
        return;
      }
      const validTypes = ['.mp3', '.wav', '.mp4', '.avi', '.m4a'];
      if (!validTypes.some(type => file.name.toLowerCase().endsWith(type))) {
        onError("Invalid file type. Please upload .mp3, .wav, .mp4, .avi, or .m4a files.");
        return;
      }
      onFileUpload(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Upload Audio or Video File</h2>
      <p className="text-gray-500 mb-4">Supported formats: .mp3, .wav, .mp4, .avi, .m4a (Max 100MB)</p>
      <input
        type="file"
        accept=".mp3,.wav,.mp4,.avi,.m4a"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Select File
      </label>
    </div>
  );
};

export default FileUpload;