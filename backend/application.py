from flask import Flask, request, jsonify
from processing import PoengProcessing
from flask_cors import CORS

application = app = Flask(__name__)
CORS(app)

processing = PoengProcessing("data.csv")

@app.route('/search')
def fuzzy_query():
    query = request.args.get('q')
    return jsonify({'data': processing.get_poengrense_fuzzy(query)})


@app.route('/points')
def get_study_points():
    query = request.args.get('study')
    return jsonify({'data': processing.get_poengrenser(query).values.tolist()})


if __name__ == '__main__':
    app.run()
