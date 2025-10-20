import "./App.css";
import Accordian from "./components/Accordian/Accordian";
import RandomColorGenerator from "./components/ColorGenerator/RandomColorGenerator";

function App() {
  return (
    <>
      <div className="App">
        {/* Accordian component */}
        <Accordian />
        <br />
        <hr />
        <br />
        {/* Random Color Generator component */}
        <RandomColorGenerator />
      </div>
    </>
  );
}

export default App;
