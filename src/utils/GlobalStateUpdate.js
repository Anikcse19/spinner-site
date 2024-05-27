export default function globalStateUpdate(
  event,
  setIsDataFetch,
  setLuckyNumber,
  setShowInitialModal,
  setHistory,
  isDataFetch,
  luckyNumber
) {
  
  if (event.luckyNumber !== null || event.luckyNumber !== "") {
    setIsDataFetch(true);
    setShowInitialModal(false);
    setLuckyNumber(String(event.luckyNumber));
  }
}
