from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load models
with open('voting_classifier_model.pkl', 'rb') as f:
    voting_model = pickle.load(f)

with open('random_forest_model.pkl', 'rb') as f:
    rf_model = pickle.load(f)

# Define Star Type categories
star_types = ['Red Dwarf', 'Brown Dwarf', 'White Dwarf', 'Main Sequence', 'Super Giants', 'Hyper Giants']

# Encode categorical features (Ensure these match your training data)
star_color_map = {'White': 0, 'Red': 1, 'Blue': 2, 'Yellow': 3, 'Yellow-Orange': 4}
spectral_class_map = {'O': 0, 'B': 1, 'A': 2, 'F': 3, 'G': 4, 'K': 5, 'M': 6}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validate input fields
        required_fields = ['temperature', 'luminosity', 'radius', 'magnitude', 'starColor', 'spectralClass', 'modelType']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Encode categorical values
        star_color_encoded = star_color_map.get(data['starColor'], -1)
        spectral_class_encoded = spectral_class_map.get(data['spectralClass'], -1)

        if star_color_encoded == -1 or spectral_class_encoded == -1:
            return jsonify({'error': 'Invalid starColor or spectralClass'}), 400

        # Prepare feature array
        features = np.array([
            data['temperature'],
            data['luminosity'],
            data['radius'],
            data['magnitude'],
            star_color_encoded,
            spectral_class_encoded
        ]).reshape(1, -1)

        # Select the model based on user choice
        model_type = data['modelType']
        if model_type == 'voting_classifier':
            model = voting_model
        elif model_type == 'random_forest':
            model = rf_model
        else:
            return jsonify({'error': 'Invalid model type. Choose either "voting_classifier" or "random_forest"'}), 400

        # Make prediction
        prediction = model.predict(features)[0]

        return jsonify({'prediction': star_types[prediction]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)