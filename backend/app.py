import os
from flask import Flask, jsonify
import requests
from flask_cors import CORS  

CORS(app, resources={
    r"/*": {
        "origins": [
            "https://react-frontend-unique123.eastus.azurecontainer.io",  
            "http://react-frontend-unique123.eastus.azurecontainer.io",   
            "http://localhost:5173",
            "http://localhost:3000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/rates' , methods=['GET'])
def getRates() :
    response = requests.get("https://v6.exchangerate-api.com/v6/97f9dc6126138480ee6da5fb/latest/USD")
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host="0.0.0.0", port=port, debug=False)

