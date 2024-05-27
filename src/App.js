import { BetContextProvider } from "./ContextApi/BetContext";
import HomePage from "./pages/HomePage";
import "./utils/socket";

function App() {
  return (
    <BetContextProvider>
      <HomePage />
    </BetContextProvider>
  );
}

export default App;
