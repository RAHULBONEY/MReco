import pandas as pd

def recommend_songs(df, user_pref, user_artists):
  
    
    recommended_songs = df[df["track_genre"].isin(user_pref)]["track_name"].tolist()

    
    if not recommended_songs:
        recommended_songs = df[df["artists"].isin(user_artists)]["track_name"].tolist()

    return recommended_songs[:10]  # Return top 10 recommendations
