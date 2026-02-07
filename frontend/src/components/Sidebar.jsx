import React from 'react';
import { MessageSquare, History, BarChart3, Home, Contact, BrainCircuit, MessageCircle } from 'lucide-react';

const Sidebar = ({ currentView, onNavigate }) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <div className="sidebar-logo-icon">
                    <BrainCircuit size={20} />
                </div>
                <h1 className="sidebar-title">
                    MindCare AI Social Anxiety Detection
                </h1>
            </div>

            <nav className="sidebar-nav">
                <button
                    onClick={() => onNavigate('home')}
                    className={`sidebar-link ${currentView === 'home' ? 'active' : ''}`}
                >
                    <Home size={20} className="sidebar-icon" />
                    <span className="sidebar-label">Home</span>
                    {currentView === 'home' && <div className="active-indicator"></div>}
                </button>

                <button
                    onClick={() => onNavigate('chat')}
                    className={`sidebar-link ${currentView === 'chat' ? 'active' : ''}`}
                >
                    <MessageCircle size={20} className="sidebar-icon" />
                    <span className="sidebar-label">Chat</span>
                    {currentView === 'chat' && <div className="active-indicator"></div>}
                </button>

                <button
                    onClick={() => onNavigate('history')}
                    className={`sidebar-link ${currentView === 'history' ? 'active' : ''}`}
                >
                    <History size={20} className="sidebar-icon" />
                    <span className="sidebar-label">History</span>
                    {currentView === 'history' && <div className="active-indicator"></div>}
                </button>

                <button
                    onClick={() => onNavigate('analysis')}
                    className={`sidebar-link ${currentView === 'analysis' ? 'active' : ''}`}
                >
                    <BarChart3 size={20} className="sidebar-icon" />
                    <span className="sidebar-label">Insights</span>
                    {currentView === 'analysis' && <div className="active-indicator"></div>}
                </button>
            </nav>

            <div className="sidebar-footer">
            </div>
        </div>
    );
};

export default Sidebar;
