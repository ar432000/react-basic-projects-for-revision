import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);

  const handleSelectItem = (id) => {
    if (selected === id) {
      setSelected(null);
    } else setSelected(id);
    // console.log(id);
  };
  return (
    <div className="wrapper">
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              className="item"
              onClick={() => handleSelectItem(item.id)}
              key={item.id}
            >
              <div className="title">
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              <div>
                {selected === item.id ? (
                  <div className="content">{item.answer}</div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
}
