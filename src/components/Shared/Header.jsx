import React, { useContext, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

import axios from "axios";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { BetContext } from "../../ContextApi/BetContext";
import WinningNumberModal from "../Modal/WinningNumberModal";
import CountDown from "./CountDown";
import History from "./History";

const url = "https://1ten365.online/api/check-balance";
const token = localStorage.getItem("token");

const Header = () => {
  const { userBalance, setUserBalance } = useContext(BetContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="header flex flex-col gap-y-3 py-2 px-2">
      <div className="flex items-center justify-between gap-2">
        <div className="left-header">
          <span className="user-title flex items-center gap-2">
            <p
              className="text-[#FF9900] font-bold
"
            >
              USER:
            </p>
            <p className="text-[#FF0400] font-bold">{window.user.name}</p>
          </span>
          <div className="flex items-center gap-1">
            <p className="balance-tag text-base font-bold text-[#FF9900]">
              Balance:
            </p>
            <div className="">
              {userBalance === 0 && (
                <span className="text-[#FF0400] font-bold "> PUB:0</span>
              )}
              {userBalance !== 0 && (
                <span className="flex items-center text-[#FF0400] text-[14px] font-bold">
                  {" "}
                  PUB {userBalance}
                  {isLoading ? (
                    <ColorRing
                      visible={true}
                      height="26"
                      width="26"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  ) : (
                    <IoMdRefresh
                      onClick={() => {
                        setIsLoading(true);
                        axios({
                          url: url,
                          method: "POST",
                          headers: {
                            Accept: "Application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            Authorization: `Bearer ${window.TOKEN}`,
                          },
                        }).then((res) => {
                          if (res?.data?.msg === "success") {
                            setUserBalance(res?.data?.balance);
                            toast.success("Balance Updated", {
                              id: "balance",
                              position: "top-left",
                            });
                            setIsLoading(false);
                          }
                        });
                      }}
                      className="text-2xl mx-2 bg-[#FF0400] text-white font-bold cursor-pointer hover:text-gray-400 focus:text-red-400"
                    />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <CountDown />
        </div>
        <div className="hidden xl:block ">
          <WinningNumberModal/>
        </div>

        <div className="hidden xl:block">
          <History />
        </div>
      </div>

      <div className="block xl:hidden">
        <History />
      </div>
    </div>
  );
};

export default Header;
