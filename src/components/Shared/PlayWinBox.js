/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { BetContext } from "../../ContextApi/BetContext";

const playWinBox = () => {
  const { winRatio, totalPlay, totalWin } = useContext(BetContext);
  // const play=localStorage.getItem("totalPlay")
  // const win=localStorage.getItem("totalWin")*(winRatio/100)

  return (
    <div
      style={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
      className=" rounded  bg-[#FF9900] flex items-center justify-center gap-2 xl:gap-x-12 px-1 py-3 xl:py-12"
    >
      <div className="flex xl:flex-col items-center gap-1">
        <span className="text-[14px] xl:text-xl font-bold">Play</span>
        <div
          style={{
            boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
          }}
          className="bg-[#9B5800] px-1 xl:px-5 xl:py-2 rounded border border-red-600"
        >
          <span className="text-white font-bold text-[10px] xl:text-xl">{totalPlay}</span>
        </div>
      </div>

      <div className="flex xl:flex-col items-center gap-1">
        <span className="text-[14px] xl:text-xl  font-bold"> Win</span>
        <div
          style={{
            boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
          }}
          className="bg-[#9B5800] px-1 xl:px-5 xl:py-2 rounded border border-red-600"
        >
          <span className="text-white font-bold text-[10px] xl:text-xl">{totalWin}</span>
        </div>
      </div>
    </div>
  );
};

export default playWinBox;
