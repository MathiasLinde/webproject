from flask  import Flask, request, jsonify 
from jsonreader import read_json_from_file  
import datetime
from flask_cors import CORS


file_path_products = 'resources_json\product.json'
file_path_delivery = 'resources_json\delivery.json'

x = datetime.datetime.now()
app = Flask(__name__)
CORS(app)


@app.route('/get_products/')
def get_products():
    try:
        json_data = read_json_from_file(file_path_products)
        return jsonify(json_data)  # Return JSON response
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message as JSON with status code 500

@app.route('/get_delivery/')
def get_delivery():
    try:
        json_data = read_json_from_file(file_path_delivery)
        return jsonify(json_data)  # Return JSON response
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message as JSON with status code 500

@app.route('/checkout_data/', methods=['POST'])
def checkout_data():
    try:
        data = request.get_json()

        print("Received data:", data)

        # implement prepared statements to add checkout_data to database

        return '', 200  # Return empty response with status code 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message as JSON with status code 500

if __name__ == '__main__':
    app.run(debug=True)
