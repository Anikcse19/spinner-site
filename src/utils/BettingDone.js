import axios from "axios";
import toast from "react-hot-toast";
import url from "../config";

export default async function bettingDone(
  betAmount,
  selectedNumber,
  setIsBetDone,
  setBetButtonClicked,
  setUserBalance,
  setIsBetComplete,
  setTotalPlay,
  setError,
  userBalance,
  setSelectedColorButton
) {
  // const url = "https://1ten365.online/api/bet";
  const formData = new FormData();
  formData.append("amount", betAmount);
  formData.append("number", selectedNumber);

  const token = localStorage.getItem("token");
  // Ajax call fot betting
  try {
    await axios({
      url: `${url}/api/bet`,
      method: "POST",
      headers: {
        Accept: "Application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${window.TOKEN}`,
      },
      data: formData,
    }).then((res) => {
      if (res.data.msg === "success") {
        setIsBetDone(true);
        setBetButtonClicked(false);
        setUserBalance(res.data.current_balance);

        setTotalPlay(res.data.total_play);
        setIsBetComplete({ value: null, status: false });
        toast.success(
          `Successfully bet ${betAmount} coins for number ${selectedNumber}`,
          {
            id: "bet succesfull",
            position: "top-right",
          }
        );
      } else {
        setUserBalance(
          res.data.current_balance ? res.data.current_balance : userBalance
        );
        setBetButtonClicked(false);
        setIsBetComplete({ value: null, status: false });

        setSelectedColorButton([]);
        toast.error(`${res?.data?.error}`, {
          position: "top-right",
        });
      }
    });
  } catch (error) {
    toast.error(`${error}`, {
      position: "top-right",
    });
  }
}
