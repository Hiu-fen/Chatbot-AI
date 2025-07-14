
import React, { useState } from 'react';
import { SendIcon } from './IconComponents';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập câu hỏi của bạn ở đây..."
        disabled={isLoading}
        className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-3 px-5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 transition-shadow"
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <SendIcon />
      </button>
    </form>
  );
};
