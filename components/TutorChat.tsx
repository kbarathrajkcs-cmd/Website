
import React, { useState, useRef, useEffect } from 'react';
import { askTutor } from '../services/geminiService';
import { ChatMessage } from '../types';

const TutorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your Cybersecurity Tutor. Ask me anything about the Python code or how to make your passwords unhackable!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-5); // Keep context brief
      const reply = await askTutor(input, history);
      setMessages(prev => [...prev, { role: 'model', content: reply || 'Sorry, I encountered an error.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: 'The tutor is offline right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <h3 className="font-semibold text-slate-200">AI Cybersecurity Tutor</h3>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-400 rounded-lg p-3 text-sm italic">
              Tutor is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorChat;
