import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelect, SetEnableMultiSelect] = useState(false);
  const [multiSelectArray, setMultiSelectArray] = useState([]);

  const handleSelectItem = (id) => {
    setSelected((prev) => {
      if (prev === id) return null;
      return id;
    });
  };

  const handleMultiSelect = (id) => {
    setMultiSelectArray((prev) => {
      if (prev.indexOf(id) === -1) {
        return [...prev, id];
      }
      return prev.filter((x) => x !== id);
    });
    console.log(multiSelectArray);
  };
  console.log(enableMultiSelect);
  return (
    <div className="wrapper">
      <button onClick={() => SetEnableMultiSelect(!enableMultiSelect)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              className="item"
              onClick={
                enableMultiSelect
                  ? () => handleMultiSelect(item.id)
                  : () => handleSelectItem(item.id)
              }
              key={item.id}
            >
              <div className="title">
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              <div>
                {enableMultiSelect
                  ? multiSelectArray.indexOf(item.id) !== -1 && (
                      <div className="content">{item.answer}</div>
                    )
                  : selected === item.id && (
                      <div className="content">{item.answer}</div>
                    )}
                {/* {selected === item.id ||
                multiSelectArray.indexOf(item.id) !== -1 ? (
                  <div className="content">{item.answer}</div>
                ) : null} */}
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

// lets add keybaord accessibility to show and hide the content using up and down keys

/*
This is also one of the approach to select handle method onClick

<div
    className="item"
    onClick={
      enableMultiSelect
        ? handleMultiSelect.bind(null, item.id)
        : handleSelectItem.bind(null, item.id)
    }
    key={item.id}
>
*/
