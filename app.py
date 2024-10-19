from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import openai

load_dotenv()  # Load environment variables

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'mp4', 'avi', 'm4a'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Get API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def transcribe_audio(audio_file):
    with open(audio_file, "rb") as file:
        transcript = openai.Audio.transcribe("whisper-1", file)
    return transcript["text"]

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Transcribe the audio file
        transcription = transcribe_audio(filepath)
        
        # Process the result
        segments = [{'start': 0, 'end': 0, 'text': transcription}]
        
        # Remove the uploaded file after processing
        os.remove(filepath)
        
        return jsonify({'segments': segments}), 200
    return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)