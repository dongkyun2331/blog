import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

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

  const onPlayerEnd = () => {
    if (playerRef.current) {
      playerRef.current.playVideo(); // 비디오가 끝날 때 다시 재생
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
        placeholder="YouTube URL"
      />
      <button onClick={handlePlayAudio}>Load Mp3</button>
      {videoId && (
        <div>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            onEnd={onPlayerEnd} // 비디오가 끝날 때 이벤트 핸들러
          />
          <button onClick={handlePlay}>
            <FaPlay />
          </button>
          <button onClick={handlePause}>
            <FaPause />
          </button>
          <button onClick={handleStop}>
            <FaStop />
          </button>
        </div>
      )}
    </div>
  );
};

export default YoutubeAudioPlayer;
