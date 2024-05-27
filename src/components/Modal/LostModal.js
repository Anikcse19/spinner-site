import { Howl } from "howler";
import React, { useContext, useEffect } from "react";
import { BetContext } from "../../ContextApi/BetContext";
import coinLostSound from "../../assets/audio/coin_lost.mp3";

const LostModal = () => {
  const { setGameLost, newBalance } = useContext(BetContext);

  useEffect(() => {
    const audio = new Howl({
      src: [coinLostSound],
    });
    audio.play();
  }, []);
  return (
    <div className="w-[95%] lg:w-[50%] mx-auto flex flex-col justify-center items-center fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[200000]">
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="w-full bg-blue-600 text-white text-lg md:text-2xl  py-8 rounded text-center flex flex-col justify-center items-center">
        <p>Alas!!! You Lost...</p>
        <div
          onClick={() => {
            setGameLost(false);
            // setIsTimer(true);
          }}
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="w-1/2 bg-red-600 px-5 py-2 rounded mt-4 text-center cursor-pointer">
          Close
        </div>
      </div>
    </div>
  );
};

export default LostModal;
