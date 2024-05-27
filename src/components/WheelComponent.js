import React, { useContext, useEffect, useRef, useState } from "react";
import { BetContext } from "../ContextApi/BetContext";


const WheelComponent = ({
  highlightedSegmentIndex,
  highlightedColor,
  highlightedTextColor,
  segments,
  segColors,
  segments2,
  segColors2,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = 290,
  upDuration,
  downDuration,
  fontFamily = "proxima-nova",
}) => {
  const tempLuckyNumber = useRef();
  const {
    setGameLost,
    setGameWin,
    isSelected,
    betAmount,
    isSpin,
    setIsSpin,
    setIsTimerStart,
    isTimerStart,
    totalDuration,
    luckyNumber,
    isDataFetch,
    setIsDataFetch,
    setLuckyNumber,
    stopSpinner,
    setIsSelected,
    isBetDone,
    setError,
  } = useContext(BetContext);

  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / `${segments.length}`;

  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;

  let width = 500;
  let height = 500;

  let spinStart = 0;
  let frames = 0;
  let centerX = 0;
  let centerY = 0;

  if(window.innerWidth <=330){
    centerX = 160;
    centerY = 160;
    width =300;
    height = 300;
  } else if (window.innerWidth < 375) {
    centerX = 170;
    centerY = 160;
    width = 350;
    height = 300;
  }  else if (window.innerWidth < 400) {
    centerX = 180;
    centerY = 160;
    width = 350;
    height = 300;
  }  else if (window.innerWidth < 450) {
    centerX = 200;
    centerY = 160;
    width = 350;
    height = 300;
  } 
  else if (window.innerWidth < 470) {
    centerX = 200;
    centerY = 160;
    width = 350;
    height = 300;
  } else if (window.innerWidth < 630) {
    centerX = 220;
    centerY = 180;
    width = 450;
    height = 350;
  } else if (window.innerWidth <= 768) {
    centerX = 360;
    centerY = 220;
    width = 600;
    height = 450;
  } else if (window.innerWidth < 900) {
    centerX = 380;
    centerY = 220;
    width = 600;
    height = 450;
  } else if (window.innerWidth <= 1024) {
    centerX = 480;
    centerY = 220;
    width = 700;
    height = 450;
  } else if (window.innerWidth < 1280) {
    centerX = 220;
    centerY = 220;
    width = 500;
    height = 450;
  } else {
    centerX = 250;
    centerY = 250;
    width = 500;
    height = 500;
  }
  // const audioRef = useRef(null);
  // useEffect(() => {
  //   // Create a new Howl instance and store it in the audioRef
  //   audioRef.current = new Howl({
  //     src: [spinningSound],
  //   });

  //   // Cleanup function to stop and unload the audio when component unmounts
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.stop();
  //       audioRef.current.unload();
  //     }
  //   };
  // }, [isSpin]);
  // useEffect(() => {
  //   // Check if the timer is started
  //   if (isSpin) {
  //     // Check if the audioRef is available
  //     if (audioRef.current) {
  //       // If the audio is already playing, stop it before playing again
  //       audioRef.current.stop();
  //       // Play the audio
  //       audioRef.current.play();
  //     }
  //   } else {
  //     // If the timer is not started, stop the audio
  //     if (audioRef.current) {
  //       audioRef.current.stop();
  //     }
  //   }
  // }, [isSpin]);

  useEffect(() => {
    stopSpinner.current = false;
    tempLuckyNumber.current = luckyNumber;
    wheelInit();
  }, []);

  useEffect(() => {
    let canvas = document.getElementById("canvas");

    let isClickAble = false;
    if (!isTimerStart && isSpin) {
      initCanvas();
      if (navigator.userAgent.indexOf("MSIE") !== -1) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("width", 1000);
        canvas.setAttribute("height", 600);
        canvas.setAttribute("id", "canvas");
        document.getElementById("wheel").appendChild(canvas);
        isClickAble = true;
      }

      setTimeout(() => {
        canvas.addEventListener("click", spin, false);
        spin();
        canvas.removeEventListener("click", spin, false);
      }, 500);
    }
  }, [isTimerStart, isSpin]);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = (value) => {
    let canvas = document.getElementById("canvas");

    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", 1000);
      canvas.setAttribute("height", 600);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }

    canvasContext = canvas.getContext("2d");
  };

  useEffect(() => {
    // ("fetch", isDataFetch);

    if (isDataFetch && luckyNumber !== "") {
      // (typeof luckyNumber);

      // setTimeout(() => {
      // stopSpinner.current = true;
      setIsDataFetch(false);
      // }, 4000);
      // winningSegment = luckyNumber;
      tempLuckyNumber.current = luckyNumber;

      // ("win1", tempLuckyNumber.current);
      // setTimeout(() => {
      //   stopSpinner.current = true;
      // }, 2000);
      // winningSegment = luckyNumber;
      // prevLuckyNum.current = luckyNumber;

      // setTimeout(() => {
      //   setIsDataFetch(false);
      //   setLuckyNumber("");
      // }, 2000);
      // spin();
    }
  }, [isDataFetch, luckyNumber]);

  const spin = () => {
    if (!isTimerStart) {
      setGameLost(false);
      setGameWin(false);
      setError(false);
      if (!isBetDone) {
        setIsSelected({ id: null, value: false });
      }

      isStarted = true;
      if (timerHandle === 0) {
        spinStart = new Date().getTime();
        // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
        maxSpeed = Math.PI / segments.length;
        // maxSpeed = Math.PI / (segments.length * 2 + Math.random());
        frames = 0;
        timerHandle = setInterval(onTimerTick, timerDelay);
      }
    }
  };

  // ("up time", upTime);
  // ("down time", downTime);

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    // const duration = 20000;
    // ("barie", duration);
    let progress = 0;
    let finished = false;

    const UT = 2000;

    // if (duration < UT) {
    //   ("win2", tempLuckyNumber.current);
    //   // ("vitore", duration);
    //   progress = duration / UT;
    //   angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    // } else {
    // ("win3", tempLuckyNumber.current);
    // ("hii");
    if (tempLuckyNumber.current) {
      // ("win4", tempLuckyNumber.current);
      // (typeof tempLuckyNumber.current, typeof currentSegment);
      // ("paisi");

      if (
        currentSegment === tempLuckyNumber.current &&
        frames > segments.length
      ) {
        // ("Match");
        progress = duration / downTime;
        // ("1", progress);
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

        // progress = 1;
        stopSpinner.current = true;
      } else {
        // ("Doesn't match");
        // stopSpinner.current = false;
        // ("painai");
        progress = duration / downTime;
        // ("2", progress, duration, downTime);
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        // currentSegment = tempLuckyNumber.current;
      }
    } else {
      // ("win5", tempLuckyNumber.current);
      // progress = duration / downTime;
      // ("3", progress);
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      tempLuckyNumber.current = luckyNumber;
    }
    if (stopSpinner.current) {
      // (stopSpinner.current);
      finished = true;
      tempLuckyNumber.current = "";
    }
    // }

    angleCurrent += angleDelta;
    // ("angel", angleCurrent);
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

    if (finished) {
      setFinished(true);
      // ("seg", currentSegment);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();

    // Check if the current segment is the one to highlight
    if (key === highlightedSegmentIndex) {
      ctx.fillStyle = highlightedColor; // Use a different color for the highlighted segment
    } else {
      ctx.fillStyle = segColors[key];
    }

    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    // (typeof key, typeof highlightedSegmentIndex);

    // Use a different color or styling for the highlighted text
    if (key === highlightedSegmentIndex) {
      ctx.fillStyle = highlightedTextColor;
    } else {
      ctx.fillStyle = contrastColor;
    }

    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      // drawSegment2(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, size, 0, PI2, false);
    // ctx.closePath();

    // ctx.lineWidth = 10;
    // ctx.strokeStyle = primaryColor;
    // ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;

    ctx.clearRect(0, 0, 1000, 800);
  };
  return (
    <div id="wheel">
      <canvas
        id="canvas"
        width={width}
        height={height}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          
        }}
      />
    </div>
  );
};
export default WheelComponent;
