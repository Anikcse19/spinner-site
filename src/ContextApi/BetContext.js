const { createContext, useState, useRef } = require("react");

export const BetContext = createContext({});

export function BetContextProvider({ children }) {
  const getRandomNumber = (min, max) =>
    String(Math.floor(Math.random() * (max - min + 1)) + min);

  const [isSelected, setIsSelected] = useState({ id: null, value: false });
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [gameLost, setGameLost] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0 + 30);
  const [betAmount, setBetAmount] = useState(null);
  const [totalPlay, setTotalPlay] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [newBalance, setNewBalance] = useState(0);
  const [userProfile, setUserProfile] = useState({
    userId: null,
    name: "",
    email: "",
  });
  const [winningNumber, setWinningNumber] = useState(null);

  const [randomLuckyNumber, setRandomLuckyNumber] = useState(
    getRandomNumber(0, 9)
  );
  const [luckyNumber, setLuckyNumber] = useState("");
  const [isBetDone, setIsBetDone] = useState(false);
  const [isBetAble, setIsBetAble] = useState(false);
  const [countDownPauser, setCountDownPauser] = useState(0 + 10);
  const [draggedItem, setDraggedItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [bonusPoint, setBonusPoint] = useState(null);
  const [currentScreenSize, setCurrentScreenSize] = useState(0);
  const [isDataFetch, setIsDataFetch] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [betButtonCliked, setBetButtonClicked] = useState(false);
  const [error, setError] = useState(false);
  const [initialWaitingTime, setInitialWaitingTime] = useState(0);
  const [isTimesUp, setIsTimesUp] = useState(false);
  const stopSpinner = useRef();
  const numberPicked = useRef();
  const [musicStart, setMusicStart] = useState(false);
  const [showWinningNumberModal, setShowWinningNumberModal] = useState(false);
  const [winningNumber2, setWinningNumber2] = useState(null);
  const [isSelectAmount,setIsSelectAmount]=useState(false)
  const [selectedColorButton,setSelectedColorButton]=useState([])
  const [sel,setSel]=useState([])
  const [winRatio,setWinRatio]=useState(0)
  const [showCustomizeAmountsModal,setShowCustomizeAmountsModal]=useState(false)
  const [betPoints,setBetPoints]=useState([0.25,0.5,5,10])
  const [selectedCoin,setSelectedCoin]=useState(null)
  const [isBetComplete,setIsBetComplete]=useState({
    value:null,state:false
  })

  function userStateUpdate(event) {
    setUserBalance(event.balance);
  }

  return (
    <BetContext.Provider
      value={{
        isSelected,
        setIsSelected,
        history,
        setHistory,
        currentTime,
        setCurrentTime,
        userBalance,
        setUserBalance,
        gameLost,
        setGameLost,
        gameWin,
        setGameWin,
        isSpin,
        setIsSpin,
        isTimerStart,
        setIsTimerStart,
        totalDuration,
        setTotalDuration,
        betAmount,
        setBetAmount,
        totalPlay,
        setTotalPlay,
        totalWin,
        setTotalWin,
        newBalance,
        setNewBalance,
        userProfile,
        setUserProfile,
        winningNumber,
        setWinningNumber,
        luckyNumber,
        setLuckyNumber,
        randomLuckyNumber,
        setRandomLuckyNumber,
        getRandomNumber,
        isBetDone,
        setIsBetDone,
        isBetAble,
        setIsBetAble,
        countDownPauser,
        setCountDownPauser,
        draggedItem,
        setDraggedItem,
        showModal,
        setShowModal,
        bonusPoint,
        setBonusPoint,
        showBonusModal,
        setShowBonusModal,
        // globalStateUpdate,
        userStateUpdate,
        currentScreenSize,
        setCurrentScreenSize,
        isDataFetch,
        setIsDataFetch,
        showInitialModal,
        setShowInitialModal,
        betButtonCliked,
        setBetButtonClicked,
        stopSpinner,
        error,
        setError,
        initialWaitingTime,
        setInitialWaitingTime,
        numberPicked,
        isTimesUp,
        setIsTimesUp,
        musicStart,
        setMusicStart,
        showWinningNumberModal,
        setShowWinningNumberModal,
        winningNumber2,
        setWinningNumber2,
        isSelectAmount,setIsSelectAmount,
        selectedColorButton,setSelectedColorButton,
        sel,setSel,
        winRatio,setWinRatio,
        showCustomizeAmountsModal,setShowCustomizeAmountsModal,
        betPoints,setBetPoints,
        isBetComplete,setIsBetComplete,selectedCoin,setSelectedCoin
      }}>
      {children}
    </BetContext.Provider>
  );
}
