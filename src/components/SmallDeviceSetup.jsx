import React, { useContext } from "react";
import Confetti from "react-confetti";
import { BetContext } from "../ContextApi/BetContext";
import LostModal from "./Modal/LostModal";
import WinModal from "./Modal/WinModal";
import WinningNumberModal from "./Modal/WinningNumberModal";
import BonusWinModal from "./Modal/bonusWinModal";
import PointAndButton from "./PointAndButton";
import Header from "./Shared/Header";
import NumberBoxs from "./Shared/NumberBoxs";
import PlayWinBox from "./Shared/PlayWinBox";
import Wheel from "./Shared/Wheel";

const SmallDeviceSetup = () => {
  const { gameLost, gameWin, showModal, showBonusModal, showColorPapers } =
    useContext(BetContext);

  return (
    <>
      <div
        // className="h-[332px]  px-5 lg:px-12  flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between"

        className="px-2"
      >
        <Header />
        {showColorPapers && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={5000}
            recycle={false} // Set to true if you want the confetti to keep falling
          />
        )}

        <div className="flex items-center gap-2">
          <div className="block xl:hidden w-[50%]">
            <PlayWinBox />
          </div>
          <div className="w-[50%] block xl:hidden">
            <WinningNumberModal />
          </div>
        </div>

        <div className="flex flex-col  xl:flex-row  xl:justify-between  xl:mt-5">
          <div className="relative self-start">
            <Wheel />
            {gameLost && showModal && <LostModal />}
            {gameWin && showModal && <WinModal />}
            {showBonusModal && <BonusWinModal />}
            {/* {showWinningNumberModal && <WinningNumberModal />} */}
          </div>
          <div className="flex flex-col  gap-y-16">
            <div className="">
              <NumberBoxs />
            </div>
            <div className="hidden xl:block">
              <PointAndButton />
            </div>
          </div>
        </div>
        <div className="block xl:hidden">
          <PointAndButton />
        </div>
        <div className="hidden xl:block w-[30%] mx-auto mt-5 mb-12">
          <PlayWinBox />
        </div>

        {/* <div className="  hidden lg:block ">
          <NumberBoxs />
        </div> */}
      </div>
    </>
  );
};

export default SmallDeviceSetup;
