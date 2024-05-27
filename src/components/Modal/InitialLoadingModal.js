import React, { useContext, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { BetContext } from "../../ContextApi/BetContext";

const InitialLoadingModal = () => {
  const { setInitialWaitingTime, initialWaitingTime } = useContext(BetContext);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setInitialWaitingTime((prevDuration) => {
        if (prevDuration > 0) {
          return prevDuration - 1;
        } else {
          clearInterval(timerInterval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [initialWaitingTime, setInitialWaitingTime]);
  return (
    <div className="max-w-[1440px] w-full h-full cursor-not-allowed bg-black opacity-70 z-40  flex flex-col grow justify-center items-center px-4 ">
      <div className="bg-white  px-24 py-24 text-center rounded-lg z-50 flex flex-col items-center justify-center gap-3">
        <span className="text-lg md:text-2xl font-extrabold text-black">
          Currently you are unable to bet. <br /> Please wait{" "}
          {Math.floor(initialWaitingTime)} seconds for the next round
        </span>
        <HashLoader color="#000" />
      </div>
    </div>
  );
};

export default InitialLoadingModal;
