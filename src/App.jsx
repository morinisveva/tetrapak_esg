import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Leaf } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to the Tetra Pak ESG Assistant. Ask me anything about Tetra Pak\'s environmental, social, or governance practices based on their sustainability reports.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://tetrapak-esg.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || 'I apologize, but I could not generate a response.'
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but there was an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const teamMembers = [
    'Anna Pirrelli 3266584',
    'Sveva Morini 3242739',
    'Natalia Yasmine Atabaki 3389334',
    'Nami Macelloni 3252291',
    'Virginia Valenti 3247223',
    'Amalia Fernandez 3386094'
  ];

  const sources = [
    {
      name: 'Tetra Pak Sustainability Report FY24',
      url: 'https://www.tetrapak.com/content/dam/tetrapak/publicweb/gb/en/sustainability/reporting-and-performance-data/TetraPak_Sustainability-Report_FY24.pdf'
    },
    {
      name: 'LCA Meta Study',
      url: 'https://www.tetrapak.com/content/dam/tetrapak/publicweb/gb/en/sustainability/ifeu%20Meta%20Analysis-LCA_climate%20change%20impact.pdf'
    }
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <Leaf className="logo-icon" />
            <h1>Tetra Pak ESG Assistant</h1>
          </div>
          <div className="team-members">
            <span className="team-label">Team Members:</span>
            <span className="team-names">{teamMembers.join(' • ')}</span>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <FileText size={20} />
            <h2>Source Documents</h2>
          </div>
          <div className="sources-list">
            {sources.map((source, index) => (
              <div key={index} className="source-item">
                {source.url ? (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="source-link"
                  >
                    <FileText size={16} />
                    <span>{source.name}</span>
                  </a>
                ) : (
                  <div className="source-link disabled">
                    <FileText size={16} />
                    <span>{source.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="sidebar-footer">
            <p className="info-text">
              This assistant uses AI to answer questions about Tetra Pak's ESG initiatives 
              based on official sustainability reports.
            </p>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="chat-container">
          <div className="messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.role}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Tetra Pak's ESG practices..."
              className="message-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
