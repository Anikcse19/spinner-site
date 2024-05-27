import React, { useContext, useEffect } from "react";
import { BetContext } from "../../ContextApi/BetContext";
import bonusWInSound from "../../assets/audio/bonusPointSound.mp3";

const BonusWinModal = () => {
  const { newBalance, bonusPoint, setShowBonusModal } = useContext(BetContext);

  useEffect(() => {
    const audio = new Audio(bonusWInSound);
    audio.play();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center absolute top-20 md:bottom-0 md:right-0 ">
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="bg-yellow-400 text-white text-2xl px-24 py-8 rounded">
        WoW!!!!!! You got Bonus Coin.
        <div
          onClick={() => {
            setShowBonusModal(false);
            // setIsTimer(true);
          }}
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="bg-red-600 px-5 py-2 rounded mt-4 text-center cursor-pointer">
          Close
        </div>
      </div>
    </div>
  );
};

export default BonusWinModal;
