import { useState, useEffect } from "react";
import "./index.css";
function RandomColorGenerator() {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("#eeffef");
  const handleGenerate_HexColor = () => {
    const hexColorArray = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor +=
        hexColorArray[Math.floor(Math.random() * hexColorArray.length)];
    }
    // console.log(hexColor);
    setColor(hexColor);
  };

  const handleGenerate_RGBColor = () => {
    let r_color = Math.floor(Math.random() * 256);
    let g_color = Math.floor(Math.random() * 256);
    let b_color = Math.floor(Math.random() * 256);

    let rgbColor = `rgb(${r_color},${g_color},${b_color})`;
    // console.log(rgbColor);
    setColor(rgbColor);
  };

  useEffect(() => {
    colorType === "hex" ? handleGenerate_HexColor() : handleGenerate_RGBColor();
  }, [colorType]);

  return (
    <div className="container" style={{ backgroundColor: `${color}` }}>
      <h1 style={{ color: "black" }}>Random color generator</h1>
      <div className="btn-list">
        <button onClick={() => setColorType("hex")}>Hex Color</button>
        <button onClick={() => setColorType("rgb")}>RGB Color</button>
        <button
          onClick={
            colorType === "hex"
              ? handleGenerate_HexColor
              : handleGenerate_RGBColor
          }
        >
          Random Color
        </button>
      </div>
      <div>
        <h2 style={{ color: "#000000" }}>{`${
          colorType === "hex" ? "HEX Color : " : "RGB Color : "
        }${color}`}</h2>
      </div>
    </div>
  );
}
export default RandomColorGenerator;
