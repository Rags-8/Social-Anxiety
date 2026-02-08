import streamlit as st
import joblib
import os
import re
import pandas as pd
import nltk
from nltk.stem import WordNetLemmatizer
from datetime import datetime

# Page Configuration
st.set_page_config(
    page_title="MindCare AI",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- NLTK Setup ---
# Eusure NLTK data is available
nltk_data_path = os.path.join(os.getcwd(), "nltk_data")
if not os.path.exists(nltk_data_path):
    os.makedirs(nltk_data_path, exist_ok=True)
nltk.data.path.append(nltk_data_path)

try:
    nltk.download('wordnet', download_dir=nltk_data_path, quiet=True)
    nltk.download('omw-1.4', download_dir=nltk_data_path, quiet=True)
except Exception as e:
    pass # handling offline or pre-downloaded scenarios

# --- Model Loading ---
@st.cache_resource
def load_model():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "backend", "models", "anxiety_model.pkl")
    vectorizer_path = os.path.join(current_dir, "backend", "models", "tfidf_vectorizer.pkl")
    
    try:
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        return model, vectorizer
    except FileNotFoundError:
        st.error("Model files not found. Please run train_model.py first.")
        return None, None

model, vectorizer = load_model()

# --- Helper Functions ---
def clean_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text).lower().strip()
    return text

def check_harmful_content(text):
    harmful_keywords = ["suicide", "kill myself", "die", "hurt myself", "death", "end my life"]
    text_lower = text.lower()
    for keyword in harmful_keywords:
        if keyword in text_lower:
            return True
    return False

suggestions_db = {
    "Low Anxiety": [
        "Great to hear you are feeling okay!",
        "Maintain your routine and stay hydrated.",
        "Keep practicing mindfulness to stay balanced."
    ],
    "Moderate Anxiety": [
        "Try some deep breathing exercises (4-7-8 technique).",
        "Take a short walk or break to clear your mind.",
        "Practice grounding techniques like identifying 5 things you see.",
        "Listen to calming music."
    ],
    "High Anxiety": [
        "Please consider reaching out to a mental health professional.",
        "Connect with a trusted friend or family member immediately.",
        "Practice deep grounding exercises.",
        "Remember, this feeling is temporary and you are not alone."
    ]
}

def get_suggestions(level):
    return suggestions_db.get(level, [])

# --- UI Layout ---

# Sidebar
with st.sidebar:
    st.title("🧠 MindCare AI")
    st.markdown("---")
    st.subheader("About")
    st.write(
        "MindCare AI uses machine learning to analyze your text and provide "
        "supportive feedback based on predicted anxiety levels."
    )
    st.markdown("---")
    st.subheader("Disclaimer")
    st.warning(
        "This tool is for educational purposes only. "
        "It is NOT a substitute for professional medical advice."
    )
    if st.button("Clear Chat History"):
        st.session_state.messages = []
        st.rerun()

# Main Chat Interface
st.title("Social Anxiety Support Chat")
st.caption("Share how you are feeling, and I'll do my best to help.")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])
        if "suggestions" in message:
            with st.expander("Helpful Suggestions"):
                for s in message["suggestions"]:
                    st.write(f"- {s}")

# Accept user input
if prompt := st.chat_input("How are you feeling today?"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)

    # Generate response
    with st.chat_message("assistant"):
        with st.spinner("Analyzing..."):
            
            # Harmful content check
            if check_harmful_content(prompt):
                 response_text = "I am really concerned about what you're sharing. Please prioritize your safety and reach out to a professional immediately."
                 anxiety_level = "High Anxiety"
                 suggestions = [
                     "Call 988 Suicide & Crisis Lifeline.",
                     "Go to the nearest emergency room.",
                     "Connect with a trusted friend."
                 ]
                 st.error("Crisis resources detected.")
            
            elif model and vectorizer:
                clean_input = clean_text(prompt)
                if clean_input:
                    vectorized_text = vectorizer.transform([clean_input])
                    prediction = model.predict(vectorized_text)[0]
                    anxiety_level = prediction
                    
                    empathy_map = {
                        "Low Anxiety": "It sounds like you are in a good headspace.",
                        "Moderate Anxiety": "It is completely normal to feel this way sometimes.",
                        "High Anxiety": "Please remember that this feeling is temporary and you are not alone."
                    }
                    phrase = empathy_map.get(anxiety_level, "")
                    response_text = f"Based on your input, the model predicts **{anxiety_level}**. {phrase}"
                    suggestions = get_suggestions(anxiety_level)
                else:
                    response_text = "I couldn't quite understand that. Could you try sharing more details?"
                    anxiety_level = "Unknown"
                    suggestions = []
            else:
                response_text = "System Error: Model not loaded."
                anxiety_level = "Error"
                suggestions = []

            st.markdown(response_text)
            if suggestions:
                with st.expander("Helpful Suggestions"):
                     for s in suggestions:
                        st.write(f"- {s}")
    
    # Add assistant response to chat history
    st.session_state.messages.append({
        "role": "assistant",
        "content": response_text,
        "suggestions": suggestions
    })
