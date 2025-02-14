import { Bot } from 'lucide-react';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.isBot ? 'items-start' : 'items-start justify-end'}`}>
          {message.isBot && (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
          )}
          <div className={`max-w-2xl rounded-lg p-4 ${
            message.isBot ? 'bg-white shadow-sm' : 'bg-blue-600 text-white'
          }`}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
} 