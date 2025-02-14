import { Bot, MessageCircle, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Bot className="w-6 h-6" />
        <h1 className="text-xl font-semibold">deepseek</h1>
      </div>
      
      <button className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg mb-6">
        <MessageCircle className="w-4 h-4" />
        <span>New chat</span>
      </button>

      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-2">Today</div>
        <div className="space-y-2">
          {['What is weather', 'Who are you', 'Can you analyze this file'].map((text) => (
            <div key={text} className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
} 