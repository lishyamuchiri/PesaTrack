import React, { useState, useRef } from 'react';
import { Card } from '../components/ui/card';

interface ReceiptUploadProps {
  onFileUpload: (file: File) => void;
}

const ReceiptUpload: React.FC<ReceiptUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Only accept images
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass to parent
    onFileUpload(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="mb-6">
      <div className="p-5">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Upload Receipt</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragging ? 'bg-indigo-50 border-indigo-300' : 'border-gray-300 hover:border-indigo-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          {previewURL ? (
            <div className="mb-3">
              <img 
                src={previewURL} 
                alt="Receipt preview" 
                className="max-h-32 mx-auto rounded"
              />
            </div>
          ) : (
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>
          )}

          <p className="text-sm text-gray-600">Drag and drop receipt image here, or click to select</p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default ReceiptUpload;