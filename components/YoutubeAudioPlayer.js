import React, { useState, useRef } from "react";
import YouTube from "react-youtube";

const YoutubeAudioPlayer = () => {
  const [videoId, setVideoId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const playerRef = useRef(null);

  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch (error) {
      console.error("Invalid URL");
      return null;
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePlayAudio = () => {
    const id = extractVideoId(inputValue);
    if (id) {
      setVideoId(id);
    } else {
      alert("유효한 YouTube URL을 입력하세요.");
    }
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter YouTube URL"
      />
      <button onClick={handlePlayAudio}>Load Video</button>
      {videoId && (
        <div>
          <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}
    </div>
  );
};

export default YoutubeAudioPlayer;
