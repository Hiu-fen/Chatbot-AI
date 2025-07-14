import React from 'react';
import { ChatMessage as ChatMessageType, MessageSender } from '../types';
import { UserIcon, SparklesIcon } from './IconComponents';

interface ChatMessageProps {
  message: ChatMessageType;
}

const LoadingIndicator = () => (
  <div className="flex space-x-1">
    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
  </div>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 bg-slate-700 rounded-full p-1.5">
          <SparklesIcon className="h-6 w-6 text-white"/>
        </div>
      )}
      <div
        className={`flex flex-col gap-1 max-w-sm md:max-w-md lg:max-w-xl ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl text-white ${
            isUser
              ? 'bg-blue-600 rounded-br-none'
              : 'bg-slate-700 rounded-bl-none'
          }`}
        >
          {message.isLoading ? (
            <LoadingIndicator />
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
      </div>
       {isUser && (
        <div className="flex-shrink-0 bg-blue-600 rounded-full p-1.5">
          <UserIcon />
        </div>
      )}
    </div>
  );
};