# 🛰️ Star Classifier: Predict Stellar Types from Astronomical Data


**Star Classifier** is an interactive web application built using Flask that allows users to predict the type of a star based on its astronomical properties such as temperature, luminosity, radius, magnitude, color, and spectral class.

The model is trained to classify stars into one of six categories:
- 🌑 Brown Dwarf  
- 🔴 Red Dwarf  
- ⚪ White Dwarf  
- ☀️ Main Sequence  
- 🌟 Supergiant  
- 💥 Hypergiant  

Each prediction is accompanied by an informative description, fun facts, and a dynamically displayed animation-style video to help users visualize the star type!

---

## 🧠 Machine Learning Model

The backend uses a **Voting Classifier** composed of several base models (like Decision Trees, KNN, and Random Forests). The model is trained on a balanced dataset with features encoded to match the trained environment.

---

## 🌌 Preview
*![ChatGPT Image Apr 13, 2025, 01_07_56 AM](https://github.com/user-attachments/assets/6e42e702-8c5d-4d69-9e33-3bbd1dcbf30f)*

---

## ⚙️ Installation & Setup

### 🔧 Requirements

- Python 3.7+
- Flask
- NumPy
- Scikit-learn
- Pickle

### 💻 Clone the Repository

```bash
git clone https://github.com/your-username/star-classifier.git
cd star-classifier
```

### 📦 Install Dependencies

We recommend using a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 📂 Project Structure

```
star-classifier/
│
├── static/
│   └── videos/               # MP4 videos named after star types (e.g., Brown_Dwarf.mp4)
│
├── templates/
│   └── index.html            # Frontend form + canvas animation + star info
│
├── voting_classifier_model.pkl  # Trained model
├── app.py                    # Flask backend
├── README.md                 # This file
└── requirements.txt          # Python dependencies
```

### 🚀 Run the Application

```bash
python app.py
```

Then visit: [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

![Uploading ChatGPT Image Apr 13, 2025, 01_18_10 AM.png…]()


---

## 🖼️ Video Assets

Place your video files inside the `static/videos/` folder, with filenames exactly matching the star prediction labels:

- `Brown_Dwarf.mp4`
- `Red_Dwarf.mp4`
- `White_Dwarf.mp4`
- `Main_Sequence.mp4`
- `Super_Giants.mp4`
- `Hyper_Giants.mp4`

---

## 💻 Tech Stack

- **Frontend:** HTML5, JavaScript, CSS (Canvas animations)
- **Backend:** Python, Flask
- **ML Libraries:** scikit-learn, NumPy
- **Visualization:** HTML5 Video & JSON-driven UI updates

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
