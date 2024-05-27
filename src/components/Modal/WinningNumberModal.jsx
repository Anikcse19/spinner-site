import React, { useContext } from "react";
import { BetContext } from "../../ContextApi/BetContext";

const WinningNumberModal = () => {
  const { winningNumber2,luckyNumber } = useContext(BetContext);

  // useEffect(() => {
  //   const audio = new Audio(bonusWInSound);
  //   audio.play();
  // }, []);
  return (
    <div
      style={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
      className="flex justify-center bg-[#FF9900] py-3 xl:px-12 rounded items-center gap-2 h-full">
        <span className="font-bold xl:text-xl">Last Win</span>
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="bg-[#9B5800] w-6 h-6 xl:w-10 xl:h-10 rounded-full flex items-center justify-center">
        <span
          style={{ textShadow: "#FC0 1px 0 10px" }}
          className=" font-extrabold text-white xl:text-xl">
          {winningNumber2}
        </span>
      </div>
    </div>
  );
};

export default WinningNumberModal;
