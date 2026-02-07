import React from 'react';
import { MessageSquare, Shield, Activity, BrainCircuit } from 'lucide-react';

const Home = ({ onNavigate }) => {
    return (
        <div className="home-container">
            <div className="home-hero-icon-wrapper">
                <MessageSquare size={64} className="home-hero-icon" />
            </div>

            <h1 className="home-title">
                Social Anxiety <span>Detection</span>
            </h1>
            <h2 className="home-subtitle">
                Conversational AI with <span>Sentiment Analysis</span>
            </h2>

            <div className="welcome-card group">
                <div className="shimmer-effect"></div>
                <div className="glass-overlay"></div>

                <h3 className="welcome-title">Welcome to MindCare AI</h3>
                <p className="welcome-text">
                    Real-time anxiety detection and personalized coping strategies powered by <span>Advanced AI</span>.
                </p>
            </div>

            <div className="features-grid">
                <div className="feature-card card-share group">
                    <div className="card-blob"></div>
                    <div className="feature-icon-wrapper">
                        <MessageSquare className="feature-icon" />
                    </div>
                    <h3 className="feature-title">Share Feelings</h3>
                    <p className="feature-text">Express yourself freely in a safe, judgment-free space.</p>
                </div>

                <div className="feature-card card-analysis group">
                    <div className="card-blob"></div>
                    <div className="feature-icon-wrapper">
                        <Activity className="feature-icon" />
                    </div>
                    <h3 className="feature-title">AI Analysis</h3>
                    <p className="feature-text">Instant feedback on your anxiety levels.</p>
                </div>

                <div className="feature-card card-track group">
                    <div className="card-blob"></div>
                    <div className="feature-icon-wrapper">
                        <Shield className="feature-icon" />
                    </div>
                    <h3 className="feature-title">Track Progress</h3>
                    <p className="feature-text">Monitor your emotional journey with insights.</p>
                </div>

                <div className="feature-card card-private group">
                    <div className="card-blob"></div>
                    <div className="feature-icon-wrapper">
                        <BrainCircuit className="feature-icon" />
                    </div>
                    <h3 className="feature-title">Private & Secure</h3>
                    <p className="feature-text">Your data is processed locally and kept private.</p>
                </div>
            </div>

            <button
                onClick={() => onNavigate('chat')}
                className="btn-start-chat"
            >
                Start Chatting Now
            </button>
        </div>
    );
};

export default Home;
