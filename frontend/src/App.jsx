import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import History from './components/History';
import Analysis from './components/Analysis';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home onNavigate={setCurrentView} />;
      case 'chat': return <ChatInterface onNavigate={setCurrentView} />;
      case 'history': return <History onNavigate={setCurrentView} />;
      case 'analysis': return <Analysis onNavigate={setCurrentView} />;
      default: return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <div className="main-content">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none -z-10"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none -z-10"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none -z-10"></div>
        <div className="absolute -bottom-32 right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-6000 pointer-events-none -z-10"></div>
        {renderView()}
      </div>
    </div>
  );
}

export default App;
