import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCoins } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { ClockLoader, RingLoader } from "react-spinners";
import { BetContext } from "../../ContextApi/BetContext";
import bettingDone from "../../utils/BettingDone";

const NumberBoxs = () => {
  // const [isSelected, setIsSelected] = useState({ id: null, value: false });
  const {
    isSelected,
    setIsSelected,
    isSpin,
    setNewBalance,
    isBetDone,
    isBetAble,
    numberPicked,
    showInitialModal,
    isTimesUp,
    betAmount,
    setDraggedItem,
    draggedItem,
    userBalance,
    setBetButtonClicked,
    setIsBetDone,
    setUserBalance,
    error,
    setError,
    selectedColorButton,
    setSelectedColorButton,
    sel,
    setSel,
    setTotalPlay,
    totalPlay,
    isBetComplete,
    setIsBetComplete,
  } = useContext(BetContext);

  const [isHoverOnShade, setIsHoverOnShade] = useState(false);

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const colors = [
    "#E100E2",
    "#40038D",
    "#00C9E8",
    "#FF7900",
    "#DA3734",
    "#7263CF",
    "#F4005C",
    "#00FD27",
    "#DEE207",
    "#4250E9",
  ];

  const handlePlaceBet = (id) => {
    if (error) {
      setDraggedItem("");
    }
    if (betAmount > 0 && id !== null && id >= 0 && isBetAble) {
      if (userBalance >= betAmount) {
        setError(false);

        //function for ajax call
        setBetButtonClicked(true);
        bettingDone(
          betAmount,
          id,
          setIsBetDone,
          setBetButtonClicked,
          setUserBalance,
          setIsBetComplete,
          setTotalPlay,
          setError,userBalance,setSelectedColorButton
        );
      } else {
        setError(true);
      }
    }
  };

  const abc = selectedColorButton.find((btn) => {
    return btn.id === 2;
  });

  return (
    <div className="relative py-5 px-3 grid grid-cols-5 gap-2 md:gap-3 xl:gap-5 xl:mx-12">
      {isTimesUp && !showInitialModal && (
        <div
          onMouseEnter={() => setIsHoverOnShade(true)}
          onMouseLeave={() => setIsHoverOnShade(false)}
          className={`${
            isHoverOnShade && "bg-black"
          } opacity-[.7] w-full h-full py-4 p-12 rounded-md flex justify-center items-center absolute  overflow-hidden z-[10000] mb-3`}
        >
          {isHoverOnShade && (
            <div className=" my-2 px-3 py-2 xl:px-12 xl:py-6 xl:px-24 xl:py-12 flex flex-col justify-center items-center ">
              <span className="md:font-bold text-white">
                <span className="text-base md:text-2xl font-extrabold block text-center text-white">
                  {isBetDone ? "Bet Placed Successfully" : "Time Out!!!"}
                </span>{" "}
                {isBetDone
                  ? "Wait for the Result"
                  : "Cannot Bet Now. Wait for the Result"}
              </span>{" "}
              <RingLoader
                className="md:font-extrabold text-sm md:text-xl"
                color="black"
              />
            </div>
          )}
        </div>
      )}
      {numbers.map((number, index) => (
        <div key={index} className="flex justify-center items-center">
          <div
            onClick={() => {
              if (draggedItem === "") {
                toast.error("Select Amount first", {
                  id: "anikkkk",
                });
              } else {
                if (!isSpin && isBetAble) {
                  setIsBetComplete({ value: index, status: true });
                  setIsBetDone(false);
                  setSelectedColorButton((prev) => [
                    ...prev,
                    { id: index, value: true, bet: draggedItem },
                  ]);
                  setIsSelected({ id: index, value: true });
                  setSel((prev) => [...prev, index]);
                  setTimeout(() => {
                    localStorage.setItem("selectedNumber", sel);
                  }, 200);
                  handlePlaceBet(index);
                  numberPicked.current = true;
                }
              }
            }}
            style={{
              backgroundColor: selectedColorButton.find((btn) => {
                return btn.id === index && btn.value;
              })
                ? `${colors[index]}`
                : "#fc1212",
                boxShadow: "rgba(0, 0, 0, .8) 0px 5px 15px",
            }}
            className={
              selectedColorButton.find((btn) => {
                return btn.id === index && btn.value;
              })
                ? `w-16 h-16 md:w-[175px]  md:h-[75px] xl:w-[111.905px] xl:h-[102.313px] rounded-[5px] border-1 border-black  text-center flex justify-center items-center  mr-0 cursor-pointer transition-all duration-300 shadow-2xl relative`
                : "w-16 h-16 md:w-[175px] md:h-[75px] xl:w-[111.905px] xl:h-[102.313px]  rounded-[5px] border-1 border-black  text-center flex justify-center items-center  mr-0 cursor-pointer relative "
            }
          >
            {isBetComplete.value === index && isBetComplete.status ? (
              <div className="w-[80%] flex items-center justify-center">
                <ClockLoader
                  className="w-3 "
                  color="#ffffff"
                  height={10}
                  radius={3}
                  width={3}
                />
              </div>
            ) : (
              <div>
                <span
                  style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  className={
                    selectedColorButton.find((btn) => {
                      return btn.id === index && btn.value;
                    })
                      ? "text-[32px] md:text-[40px]  font-[700] text-black"
                      : "text-[32px] md:text-[40px] font-[700] text-[#fff]  "
                  }
                >
                  {number}
                </span>
                {selectedColorButton.find((btn) => {
                  return btn.id === index && btn.value;
                }) && (
                  <div className="absolute -top-3 -right-2 xl:-top-6 xl:-right-5 text-xl md:text-2xl xl:text-5xl text-black font-extrabold">
                    <TiPin />
                  </div>
                )}

                {selectedColorButton.find((btn) => {
                  return btn.id === index && btn.value;
                }) && (
                  <div
                    style={{
                      boxShadow:
                        " rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                    }}
                    className="absolute flex  items-center gap-1 bg-rose-700 shadow-2xl w-8 h-8 md:w-10 md:h-10 md:p-1 -bottom-1 -right-1 xl:-bottom-3 xl:-right-3 text-white text-[8px] md:text-[10px] font-bold rounded-full "
                  >
                    <FaCoins className="text-orange-400" />
                    <span>
                      {
                        selectedColorButton.find((btn) => {
                          return btn.id === index && btn.value;
                        }).bet
                      }
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberBoxs;
