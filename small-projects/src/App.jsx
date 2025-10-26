import "./App.css";
import Accordian from "./components/Accordian/Accordian";
import RandomColorGenerator from "./components/ColorGenerator/RandomColorGenerator";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import StarRating from "./components/StarRating/StarRating";

function App() {
  return (
    <>
      <div className="App">
        {/* Accordian component */}
        {/* <Accordian />
        <br />
        <hr />
        <br /> */}
        {/* Random Color Generator component */}
        {/* <RandomColorGenerator />
        <br />
        <hr />
        <br /> */}
        {/* Star Rating components */}
        {/* <StarRating starRatingSize={10} />
        <br />
        <hr />
        <br /> */}
        <ImageSlider />
      </div>
    </>
  );
}

export default App;
