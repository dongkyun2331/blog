import React, { useState } from "react";
import YouTube from "react-youtube";

const YoutubeAudioPlayer = () => {
  const [videoId, setVideoId] = useState("");
  const [inputValue, setInputValue] = useState("");

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
      <button onClick={handlePlayAudio}>Play Audio</button>
      {videoId && <YouTube videoId={videoId} opts={opts} />}
    </div>
  );
};

export default YoutubeAudioPlayer;
