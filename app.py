from flask import Flask, request, jsonify
import pandas as pd
from music_recommender import recommend_songs  # Import recommendation logic

app = Flask(__name__)

# Load dataset.csv (Ensure it's in the correct path)
df = pd.read_csv("dataset.csv")

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        # Get JSON data from request
        data = request.get_json()
        user_name = data.get("name", "User")
        user_pref = data.get("pref", [])
        user_artists = data.get("artists", [])

        # Call the recommendation function
        recommended_songs = recommend_songs(df, user_pref, user_artists)

        # Print recommendations in terminal
        print(f"\nRecommended Songs for {user_name}: {recommended_songs}\n")

        return jsonify({"message": "Recommendation processed", "songs": recommended_songs}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/testdata", methods=["GET"])
def testdata():
    try:
        sample_data = df.head(5).to_dict(orient="records")  # Convert first 5 rows to JSON
        return jsonify({"message": "Sample data retrieved", "data": sample_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="localhost", port=5001)  # Running Flask on port 5001
