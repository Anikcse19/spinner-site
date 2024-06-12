import React, { useContext, useEffect } from "react";
import { BetContext } from "../ContextApi/BetContext";
import echo from "../utils/socket";
// import globalStateUpdate from "../utils/GlobalStateUpdate";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import InitialLoading from "../components/Modal/InitialLoadingModal";
import AudioPlayer from "../components/Shared/MusicPlayer";
import SmallDeviceSetup from "../components/SmallDeviceSetup";
import globalStateUpdate from "../utils/GlobalStateUpdate";
import url from "../config";

const HomePage = () => {
  const {
    history,
    setHistory,
    setCurrentTime,
    setLuckyNumber,
    setUserBalance,
    setMusicStart,
    isSpin,
    setIsDataFetch,
    isDataFetch,
    luckyNumber,
    showInitialModal,
    setShowInitialModal,
    setIsSpin,
    setIsTimerStart,
    setTotalDuration,
    setIsBetAble,
    setInitialWaitingTime,
    setWinningNumber2,
    setSelectedColorButton,
    setIsBetDone,
    setWinRatio,
    setIsTimesUp,
    setTotalPlay,
    setTotalWin,
    setRunningRound,
  } = useContext(BetContext);

  let screenSize;
  if (window.innerWidth < 1024) {
    screenSize = "small";
  } else {
    screenSize = "big";
  }

  // const url = `${url}/init-render-data`;

  useEffect(() => {
    // calculate present time
    const presentTime = new Date();
    const minutes = presentTime.getMinutes();
    const seconds = presentTime.getSeconds();
    const p = minutes * 60 + seconds;

    setHistory(window.initialBettingHistory);
    setCurrentTime(window.initialBettingTime);
    setWinningNumber2(window.initialBettingHistory[6]);
    try {
      axios({
        url: `${url}/init-render-data`,
        method: "POST",
        headers: {
          Accept: "Application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${window.TOKEN}`,
        },
      }).then((res) => {
        // console.log(res.data);
        setTimeout(() => {
          setMusicStart(true);
        }, 500);

        // set running round
        setRunningRound(res?.data?.running_round);

        // calculate next event time
        const nTime = new Date(res?.data?.nextEventAt);
        const minutes = nTime.getMinutes();
        const seconds = nTime.getSeconds();
        const q = minutes * 60 + seconds;
        let diff = q - p;

        // console.log("diff", diff);

        //set initial user balance
        setUserBalance(res?.data?.balance);
        // set initial game win ratio
        setWinRatio(res?.data?.win_ratio);
        //set initial total play amounts
        setTotalPlay(res?.data?.total_play);
        // set initial total win amounts
        setTotalWin(res?.data?.total_win);

        // set initail history and luckeynumber
        const slicedSpinHistory = res.data.spinHistory.slice(0, 7);
        const luckyNumbers = [];
        slicedSpinHistory.map((l) => {
          luckyNumbers.push(l.lucky_number);
        });

        setHistory(luckyNumbers);
        setWinningNumber2(luckyNumbers[6]);

        // set initial bets if axists
        if (res?.data?.bets?.length > 0) {
          setShowInitialModal(false);
          // setIsSpin(true)
          // setIsTimerStart(false)
          res?.data?.bets?.map((bet) => {
            setSelectedColorButton((prev) => [
              ...prev,
              { id: bet.number, value: true, bet: bet.amount },
            ]);
          });

          setIsBetDone(true);
          setIsTimesUp(true);

          if (res?.data?.nextEventAfterSeconds >= 20) {
            setIsSpin(false);
            setIsTimerStart(true);
            setTotalDuration(10);
            setIsBetAble(true);
          } else {
            setInitialWaitingTime(res?.data?.nextEventAfterSeconds + 2);
            setIsSpin(true);
            // setShowInitialModal(true);
          }

          return;
        }

        // diff = 15;

        if (res?.data?.nextEventAfterSeconds >= 20) {
          // setInitialWaitingTime(diff);
          // setShowInitialModal(true);
          setIsSpin(false);
          setIsTimerStart(true);
          setTotalDuration(10);
          setIsBetAble(true);
        } else {
          setInitialWaitingTime(res?.data?.nextEventAfterSeconds + 2);
          setIsSpin(true);
          setShowInitialModal(true);
        }
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
      });
    }
  }, []);

  useEffect(() => {
    // private channel subscribed
    try {
      echo
        .private(`UPDATE_USER_STATE_${window.user.id}`)
        .listen("UpdateUserStateEvent", (event) => {
          setUserBalance(event.balance);
          setTotalWin(event.total_win);
        });

      //public channel subscribed
      echo.channel("GLOBAL_STATE_CHANNEL").listen("SpinEvent", (event) => {
        globalStateUpdate(
          event,
          setIsDataFetch,
          setLuckyNumber,
          setShowInitialModal,
          isDataFetch,
          setHistory,
          luckyNumber,
          setWinningNumber2
        );
        setRunningRound(event.running_round);
        // set History and time
        if (event.spinHistory) {
          setHistory([]);
          setCurrentTime([]);

          const slicedCurrentTime = event.spinHistory.slice(0, 7);
          const slicedHistory = event.spinHistory.slice(0, 7);

          const luckyNumber = [];
          const tempCurrentTime = [];

          slicedHistory.map((s) => {
            return luckyNumber.push(s.lucky_number);
          });
          setHistory(luckyNumber.reverse());

          slicedCurrentTime.map((t) => {
            const managedTime = new Date(t.created_at);

            const hours = managedTime.getHours();
            const minutes = managedTime.getMinutes();
            const formatedTime = `${hours}:${minutes}`;

            return tempCurrentTime.push(formatedTime);
          });
          setCurrentTime(tempCurrentTime.reverse());
        }
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
      });
    }
  }, []);

  return (
    <div
      className={`${
        isSpin && "!cursor-not-allowed"
      }  relative content-body w-full  ${
        showInitialModal ? "h-screen md:h-fit overflow-hidden" : "h-fit"
      } `}
    >
      {showInitialModal && (
        <div className="w-full h-screen fixed 2xl:absolute  z-[1000] md:top-0 ">
          {" "}
          <InitialLoading />
        </div>
      )}

      <AudioPlayer />
      <div className="mb-12">
        <SmallDeviceSetup />
      </div>
      {/* <div className="hidden lg:block">
        <LargeScreenSetup />
      </div> */}
      <Toaster />
    </div>
  );
};

export default HomePage;
