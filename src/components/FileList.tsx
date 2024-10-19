import React from 'react';
import { FileAudio } from 'lucide-react';

interface FileListProps {
  files: File[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={index} className="flex items-center bg-gray-100 p-2 rounded">
            <FileAudio className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm">{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;