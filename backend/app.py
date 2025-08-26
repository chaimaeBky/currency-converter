from flask import Flask, jsonify
import requests
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/rates' , methods=['GET'])
def getRates() :
    response = requests.get("https://v6.exchangerate-api.com/v6/97f9dc6126138480ee6da5fb/latest/USD")
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
