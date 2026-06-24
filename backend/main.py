from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "The backend is running!"})

if __name__ == '__main__':
    app.run(debug=True , port=5000)