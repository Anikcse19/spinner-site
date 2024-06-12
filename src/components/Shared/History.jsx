import { useContext } from "react";
import { BetContext } from "../../ContextApi/BetContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const History = () => {
  const { history, runningRound } = useContext(BetContext);

  useGSAP(() => {
    gsap.to("#roundNo", {
      x: 0,
      duration: 4,
      ease: "back.out",
    });
  }, []);

  return (
    <div className="w-full flex justify-around gap-1">
      <div className="w-fit self-center">
        <p className="text-[#FF9900] font-bold lg:text-2xl">History:</p>
      </div>
      <div className="flex-grow bg-[#FF9900] py-1 flex flex-col justify-center  gap-y-2  rounded-md">
        <div className="bg-[#FF9900] flex justify-evenly items-center gap-1 lg:gap-2 px-1 xl:px-5  rounded-md">
          {history?.map((h, i) => (
            <span
              key={i}
              style={{
                boxShadow: "rgba(0, 0, 0, .8) 0px 5px 15px",
              }}
              className="bg-red-600 px-2 xl:px-3 xl:py-1 rounded-md font-bold text-white"
            >
              <p
                style={{
                  textShadow: "#FC0 1px 0 10px",
                }}
              >
                {" "}
                {h}
              </p>
            </span>
          ))}
        </div>

        <div
          id="roundNo"
          className="self-center flex items-center gap-3 translate-x-96"
        >
          <p>Running Round:</p>
          <p
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
            className="bg-orange-200 px-4 rounded-lg font-bold animate-pulse"
          >
            {runningRound}
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
