import { useContext } from "react";
import { BetContext } from "../../ContextApi/BetContext";

const History = () => {
  const { history, currentTime } = useContext(BetContext);

  return (
   <div className="w-full flex justify-around gap-1">
    <div className="w-fit self-center">
      <p className="text-[#FF9900] font-bold lg:text-2xl">History:</p>
    </div>
    <div className="flex-grow bg-[#FF9900] flex justify-evenly items-center gap-1 lg:gap-2 px-1 xl:px-5 py-1 xl:py-3 rounded-md">
      {
        history?.map((h,i)=>(
          <span
          key={i}
          style={{
            boxShadow: "rgba(0, 0, 0, .8) 0px 5px 15px",
            
          }}
          className="bg-red-600 px-2 xl:px-3 xl:py-1 rounded-md font-bold text-white">
           <p style={{
            textShadow: "#FC0 1px 0 10px"
           }}> {h}</p>
          </span>
        ))
      }

    </div>
   </div>
  );
};

export default History;
