import React, { useEffect, useState } from "react";

function WebPlayback(props) {
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState({
    name: "",
    album: { images: [{ url: "" }] },
    artists: [{ name: "" }],
  });
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);
        setActive(state.paused ? false : true);
      });

      player.connect();
    };
  }, [props.token]);

  const playSong = async (trackUri) => {
    if (!player) {
      console.error("Player not initialized");
      return;
    }
    try {
      await player.resume(); // Use resume if paused, or implement play
      await player.play({ uris: [trackUri] });
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  return (
    <div className="container">
      <div className="main-wrapper">
        <img
          src={currentTrack.album.images[0].url}
          className="now-playing__cover"
          alt=""
        />
        <div className="now-playing__side">
          <div className="now-playing__name">{currentTrack.name}</div>
          <div className="now-playing__artist">
            {currentTrack.artists[0].name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebPlayback;
