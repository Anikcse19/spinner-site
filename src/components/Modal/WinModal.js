import React, { useContext } from "react";
import { BetContext } from "../../ContextApi/BetContext";

const WinModal = () => {
  const { setGameWin, newBalance ,winningNumber2} = useContext(BetContext);

  // useEffect(() => {
  //   const audio = new Audio(coinWInSound);
  //   audio.play();
  // }, []);
  return (
    <div className="w-[95%] mx-auto flex flex-col justify-center items-center fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[200000]">
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="w-full bg-green-400 text-white text-lg md:text-2xl  py-8 rounded text-center flex flex-col justify-center items-center">
        <p>Congrats!!! You Win for Number</p>
         <span  style={{ textShadow: "#05ED98 1px 0 10px" }} className="text-emerald-900 font-bold text-4xl">{winningNumber2}</span>
        <div
          onClick={() => {
            setGameWin(false);
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

export default WinModal;
