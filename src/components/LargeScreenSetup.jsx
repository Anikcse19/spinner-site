import React from "react";
import Header from "./Shared/Header";
import NumberBoxs from "./Shared/NumberBoxs";
import WheelForLargeDevice from "./Shared/WheelForLargeDevice";

const LargeScreenSetup = () => {
  return (
    <>
      <Header/>
      <div className="">
        <div className="relative xl:mt-12">
          <WheelForLargeDevice/>
        </div>
        <div>
          <NumberBoxs/>
        </div>
      </div>
    </>
  );
};

export default LargeScreenSetup;
