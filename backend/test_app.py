import requests
import time
import sys

BASE_URL = "http://127.0.0.1:8000"

def test_predict_harmful():
    print("\n--- Testing Harmful Content ---")
    try:
        data = {"text": "I want to kill myself", "user_id": "test_user"}
        res = requests.post(f"{BASE_URL}/predict", json=data)
        if res.status_code == 200:
            json_data = res.json()
            if json_data["anxiety_level"] == "High Anxiety" and "988" in json_data["suggestions"][0]:
                print("PASS: Harmful content detected and Crisis resources returned.")
            else:
                print(f"FAIL: Unexpected response for harmful content: {json_data}")
        else:
            print(f"FAIL: Status {res.status_code} - {res.text}")
    except Exception as e:
        print(f"FAIL: Exception {e}")

def test_predict_normal():
    print("\n--- Testing Normal Content ---")
    try:
        data = {"text": "I feel a bit nervous about the party", "user_id": "test_user"}
        res = requests.post(f"{BASE_URL}/predict", json=data)
        if res.status_code == 200:
            json_data = res.json()
            if "explanation" in json_data and "anxiety_level" in json_data:
                print(f"PASS: Normal prediction successful. Level: {json_data['anxiety_level']}")
                print(f"Explanation: {json_data['explanation']}")
            else:
                print("FAIL: Missing explanation or anxiety_level")
        else:
            print(f"FAIL: Status {res.status_code} - {res.text}")
    except Exception as e:
        print(f"FAIL: Exception {e}")

def test_insights():
    print("\n--- Testing Insights ---")
    user_id = "test_user_viz"
    # Save a High Anxiety chat
    chat_data = {
        "user_id": user_id,
        "message": "Test insight message",
        "response": "Test response",
        "anxiety_level": "High Anxiety",
        "suggestions": ["Test"]
    }
    requests.post(f"{BASE_URL}/history", json=chat_data)
    
    res = requests.get(f"{BASE_URL}/get_insights/{user_id}")
    if res.status_code == 200:
        data = res.json()
        print(f"PASS: Insights retrieved: {data}")
        if data["high"] >= 1:
            print("PASS: High anxiety count incremented.")
        else:
            print("FAIL: High anxiety count not incremented.")
    else:
        print(f"FAIL: Insights Status {res.status_code}")

if __name__ == "__main__":
    print("Waiting for server...")
    time.sleep(2) # setup
    try:
        test_predict_harmful()
        test_predict_normal()
        test_insights()
    except Exception as e:
        print(f"Test Suite Failed: {e}")
