import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MessageList } from './components/MessageList';
import { Message, ChatMode } from './types';
import { MessageCircle, Search, Paperclip, Send, Settings, Bot, Brain, Globe } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi, I'm DeepSeek. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ChatMode>('deepthink');
  const [showModes, setShowModes] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: input,
      isBot: false
    }]);
    setInput('');
    setShowModes(false);
    setShowSearchSuggestions(false);
  };

  const handleModeSelect = (selectedMode: 'deepthink' | 'search') => {
    setMode(selectedMode);
    setShowModes(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto relative">
            <div className="relative flex flex-col">
              {/* Mode Selection */}
              {showModes && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 shadow-lg p-2">
                  <div 
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleModeSelect('deepthink')}
                  >
                    <Brain className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">DeepThink (R1)</div>
                      <div className="text-sm text-gray-500">Advanced reasoning capabilities</div>
                    </div>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleModeSelect('search')}
                  >
                    <Globe className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Search</div>
                      <div className="text-sm text-gray-500">Search the web for information</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Suggestions */}
              {mode === 'search' && showSearchSuggestions && input.trim() && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg border border-gray-200 shadow-lg p-2">
                  <div className="text-xs text-gray-500 px-2 py-1">Search suggestions</div>
                  {[
                    `${input} latest news`,
                    `${input} definition`,
                    `${input} examples`,
                    `${input} tutorial`
                  ].map((suggestion) => (
                    <div
                      key={suggestion}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => {
                        setInput(suggestion);
                        setShowSearchSuggestions(false);
                      }}
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}

               {/* Input Bar */}
               <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Mode Toggle Buttons */}
                <div className="flex items-center px-2 space-x-1">
                  <button 
                    onClick={() => setMode('deepthink')}
                    className={`flex items-center space-x-1 py-2 px-3 rounded-md text-sm ${
                      mode === 'deepthink' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Brain className="w-4 h-4" />
                    <span>DeepThink (R1)</span>
                  </button>
                  <button 
                    onClick={() => setMode('search')}
                    className={`flex items-center space-x-1 py-2 px-3 rounded-md text-sm ${
                      mode === 'search' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                  <div className="w-px h-5 bg-gray-200 ml-1"></div>
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (mode === 'search') {
                      setShowSearchSuggestions(true);
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  onFocus={() => mode === 'search' && setShowSearchSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  placeholder={mode === 'search' ? 'Search the web...' : 'Message DeepSeek'}
                  className="flex-1 px-4 py-3 bg-transparent outline-none"
                />
                <div className="flex items-center space-x-2 px-3">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={handleSend}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Send className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-xs text-gray-400">
              AI-generated, for reference only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;