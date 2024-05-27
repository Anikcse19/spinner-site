import React, { useContext, useEffect, useRef } from "react";
import backgroundMusic from "../../assets/audio/backgroundMusic.mp3";
import { BetContext } from "../../ContextApi/BetContext";

const AudioPlayer = () => {
  const audioRef = useRef();
  const { musicStart, setMusicStart } = useContext(BetContext);

  useEffect(() => {
    const startPlayback = () => {
      audioRef.current.play();
      audioRef.current.loop = true;
      window.removeEventListener("click", startPlayback);
    };
    document.body.click();

    // Attach the event listener to the desired user interaction event
    window.addEventListener("click", startPlayback);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", startPlayback);
    };
  }, [musicStart]);

  return (
    <audio ref={audioRef} controls={false} className="hidden">
      <source src={backgroundMusic} type="audio/mp3" />
    </audio>
  );
};

export default AudioPlayer;
