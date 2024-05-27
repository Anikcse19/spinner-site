import React, { useContext } from "react";
import { BetContext } from "../../ContextApi/BetContext";
import WheelComponent from "../WheelComponent";

const Wheel = () => {
  const {
    setIsSelected,
    setGameLost,
    setGameWin,
    setIsSpin,
    setIsTimerStart,
    setTotalDuration,
    setTotalWin,
    setWinningNumber,
    luckyNumber,
    isBetDone,
    setIsBetDone,
    setIsBetAble,
    betAmount,
    setBetAmount,
    setLuckyNumber,
    setDraggedItem,
    setShowModal,
    bonusPoint,
    setShowBonusModal,
    setRandomLuckyNumber,
    getRandomNumber,
    stopSpinner,
    setIsTimesUp,
    setWinningNumber2,
    setSelectedColorButton,
    setShowWinningNumberModal,
    selectedColorButton,
    totalWin,winRatio,setSelectedCoin,showColorPapers,setShowColorPapers
  } = useContext(BetContext);

  const segments = ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

  const segColors = [
    "#D107E2",
    "#0C7EE5",
    "#DEE207",
    "#07E21D",
    "#ED106A",
    "#6E3CCF",
    "#DA0906",
    "#FF7900",
    "#12CAE3",
    "#40038D",
  ];

  let wheelSize;

  if (window.innerWidth < 470) {
    wheelSize = 130;
  } else if (window.innerWidth < 630) {
    wheelSize = 160;
  } else if (window.innerWidth < 768) {
    wheelSize = 160;
  } else if (window.innerWidth < 900) {
    wheelSize = 180;
  } else if (window.innerWidth < 1024) {
    wheelSize = 190;
  } else if (window.innerWidth < 1280) {
    wheelSize = 210;
  } else {
    wheelSize = 210;
  }


  const onFinished = async (winner) => {
    
    setWinningNumber2(winner);
    setShowWinningNumberModal(true);
    setDraggedItem("");
    setWinningNumber(winner);
    setGameLost(false);
    setGameWin(false);
    setIsSpin(false);
    setIsBetDone(false);
    setLuckyNumber("");
    setRandomLuckyNumber(getRandomNumber(0, 9));
    setIsTimesUp(false);
    stopSpinner.current = false;
    setSelectedColorButton([])
    setSelectedCoin(null)

    let selectedNumber = localStorage.getItem("selectedNumber");

    if (!selectedNumber) {
      setDraggedItem("");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTimerStart(true);
      setTotalDuration(0 + 30);
      setIsBetAble(true);
      return;
    }

    const answer=selectedColorButton.find((number)=>Number(number.id)===Number(winner))
    
    
  

    
    if (isBetDone) {
      // if win
      
      
      if (answer!==undefined && (Number(winner) === Number(answer.id))) {
        
        
        //if get bonus
        if (bonusPoint !== null) {
          setShowBonusModal(true);
          setTimeout(() => {
            setShowBonusModal(false);
          }, 5000);
        } else {
        }
        localStorage.removeItem("selectedNumber");
        setIsSelected({ id: null, value: false });
        setDraggedItem("");
        setGameWin(true);
      
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        setSelectedColorButton([])
        setShowColorPapers(true)
        setTimeout(() => {
          setShowColorPapers(false)
        }, 10000);
      } else {
        
        localStorage.removeItem("selectedNumber");
        setIsSelected({ id: null, value: false });
        setDraggedItem("");
        setGameLost(true);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        setSelectedColorButton([])
       
      }
    } else {
      setIsSelected({ id: null, value: false });
    }

    setBetAmount(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsTimerStart(true);
    setTotalDuration(0 + 30);
    setIsBetAble(true);
  };

  return (
    <div>
      <div>
        <WheelComponent
          segments={segments}
          winningSegment={luckyNumber}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="#FF7300"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={wheelSize}
          upDuration={1000}
          downDuration={10000}
          fontFamily="Arial"
        />
      </div>
    </div>
  );
};

export default Wheel;
