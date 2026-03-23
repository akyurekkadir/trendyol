import React, { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: `Last login: ${new Date().toUTCString()} on ttys001` },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTypingAbout, setIsTypingAbout] = useState(false);
  const [typingOutput, setTypingOutput] = useState('');
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const bioText = `Hello! I'm a computer engineering senior student and a data science enthusiast.
Currently, I'm working on an earthquake risk forecasting project using seismic
data within a TÜBİTAK 1001 research framework. I'm actively participating in
datathons and eagerly seeking an internship in AI & Data Science to apply my skills.`;

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, typingOutput]);

  // Initial Auto-Run 'cat about' command
  useEffect(() => {
    // Only run once on mount
    setHistory([
      { type: 'system', text: `Last login: ${new Date().toUTCString()} on ttys001` },
      { type: 'input', text: 'cat about' }
    ]);
    setIsTypingAbout(true);
  }, []);

  // Handle typing effect for "cat about"
  useEffect(() => {
    if (isTypingAbout) {
      setTypingOutput('');
      let i = 0;
      const interval = setInterval(() => {
        setTypingOutput(bioText.slice(0, i + 1));
        i++;
        if (i >= bioText.length) {
          clearInterval(interval);
          setIsTypingAbout(false);
          // Add the completed bio directly to history so it persists
          setHistory(prev => [...prev, { type: 'output', text: bioText }]);
          setTypingOutput('');
          inputRef.current?.focus();
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isTypingAbout]);

  // Focus input on click anywhere
  const handleContainerClick = () => {
    if (!isTypingAbout) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter' && !isTypingAbout) {
      const cmd = inputVal.trim();
      const newHistory = [...history, { type: 'input', text: cmd }];
      
      setInputVal(''); // Clear input

      if (cmd === '') {
        setHistory(newHistory);
        return;
      }

      switch(cmd.toLowerCase()) {
        case 'clear':
          setHistory([]);
          break;
        case 'ls':
          newHistory.push({ type: 'output', text: 'about.txt\nprojects/\ncontact.md\ntrendyol_app.app' });
          setHistory(newHistory);
          break;
        case 'cat about':
        case 'cat about.txt':
          setHistory(newHistory);
          setIsTypingAbout(true);
          break;
        case 'help':
          newHistory.push({ type: 'output', text: 'Available commands:\nls         - List directory contents\ncat about  - Read the about me file\nclear      - clear the terminal screen\nhelp       - show this message' });
          setHistory(newHistory);
          break;
        default:
          newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for available commands.` });
          setHistory(newHistory);
      }
    }
  };

  return (
    <div 
      className="bg-black/95 h-full w-full p-4 font-mono text-[13px] text-green-400 overflow-y-auto selection:bg-green-400/30 cursor-text"
      onClick={handleContainerClick}
    >
      {/* History History */}
      {history.map((line, idx) => (
        <div key={idx} className="mb-0.5 leading-snug">
          {line.type === 'system' && (
            <div className="text-gray-400 mb-2">{line.text}</div>
          )}
          {line.type === 'input' && (
            <div className="flex">
              <span className="text-white mr-2">kadir@macbook ~ %</span>
              <span className="text-white break-all">{line.text}</span>
            </div>
          )}
          {line.type === 'output' && (
            <div className="whitespace-pre-wrap text-emerald-300 opacity-90">{line.text}</div>
          )}
          {line.type === 'error' && (
            <div className="text-red-400">{line.text}</div>
          )}
        </div>
      ))}
      
      {/* Current Typing Animation */}
      {isTypingAbout && (
        <div className="whitespace-pre-wrap mt-0.5 leading-snug text-emerald-300">
          {typingOutput}
        </div>
      )}

      {/* Active Input Line */}
      {!isTypingAbout && (
        <div className="flex mt-1 items-center">
          <span className="text-white mr-2 whitespace-nowrap">kadir@macbook ~ %</span>
          <input 
            ref={inputRef}
            type="text" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono"
            spellCheck={false}
          />
        </div>
      )}

      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
