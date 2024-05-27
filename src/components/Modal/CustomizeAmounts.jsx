import React, { useContext, useState } from "react";
import { BetContext } from "../../ContextApi/BetContext";

const CustomizeAmounts = () => {

  const {setShowCustomizeAmountsModal}=useContext(BetContext)
    const pointsIndex = [1, 2, 3, 4];
  const pointsString = localStorage.getItem("betPoints");

  const pointsArray = JSON.parse(pointsString);


    const [points1,setPoints1]=useState(pointsArray[0])
    const [points2,setPoints2]=useState(pointsArray[1])
    const [points3,setPoints3]=useState(pointsArray[2])
    const [points4,setPoints4]=useState(pointsArray[3])

  
  

  const handleCustomizeAmounts=()=>{
    
    const newAmounts=[Number(points1),Number(points2),Number(points3),Number(points4)]
   
    const newAmountsString=JSON.stringify(newAmounts)
    
    setTimeout(()=>{
      localStorage.setItem("betPoints",newAmountsString)
    },500)
    setShowCustomizeAmountsModal(false)
  }
  return (
    <div>
      <div className="absolute -top-60 right-8 xl:top-0 xl:right-44 z-[2000000] overflow-hidden bg-cyan-900 rounded-lg p-5 shadow-2xl w-[80%]">
        <div className="text-center">
          <span className="text-white font-bold text-base md:text-xl xl:text-2xl">Customize Shortcut Coins</span>
        </div>

        {/* exists points */}
        <div className="my-10 w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {/* points 1 */}
          <div className="w-full flex flex-col flex-wrap md:flex-nowrap items-center justify-around gap-3 mb-2">
            <span className="text-white font-bold bg-black p-3 rounded-full">C {pointsIndex[0]}</span>
            <input onChange={(e)=>setPoints1(e.target.value)} defaultValue={pointsArray[0]} className="w-[70%] mb-0 text-center" />
          </div>

          {/* points 2 */}
          <div className="w-full flex flex-col flex-wrap md:flex-nowrap items-center justify-around gap-3 mb-2">
            <span className="text-white font-bold bg-black p-3 rounded-full">C {pointsIndex[1]}</span>
            <input onChange={(e)=>setPoints2(e.target.value)} defaultValue={pointsArray[1]} className="w-[70%] mb-0 text-center" />
          </div>

          {/* points 3 */}
          <div className="w-full flex flex-col flex-wrap md:flex-nowrap items-center justify-around gap-3 mb-2">
            <span className="text-white font-bold bg-black p-3 rounded-full">C {pointsIndex[2]}</span>
            <input onChange={(e)=>setPoints3(e.target.value)} defaultValue={pointsArray[2]} className="w-[70%] mb-0 text-center" />
          </div>

          {/* points 4 */}
          <div className="w-full flex flex-col flex-wrap md:flex-nowrap items-center justify-around gap-3 mb-2">
            <span className="text-white font-bold bg-black p-3 rounded-full">C {pointsIndex[3]}</span>
            <input onChange={(e)=>setPoints4(e.target.value)} defaultValue={pointsArray[3]} className="w-[70%] mb-0 text-center" />
          </div>
        </div>
        <div className="flex justify-center gap-3">
        <span onClick={()=>setShowCustomizeAmountsModal(false)} className="bg-red-600 px-3 py-1 rounded text-white font-bold cursor-pointer">Cancel</span>
          <span onClick={handleCustomizeAmounts} className="bg-black px-3 py-1 rounded text-white font-bold cursor-pointer">Save</span>
        </div>
      </div>
    </div>
  );
};

export default CustomizeAmounts;
