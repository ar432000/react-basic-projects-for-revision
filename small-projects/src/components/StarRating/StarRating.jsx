import { useState } from "react";
import "./index.css";
function StarRating({ starRatingSize = 5 }) {
  const [currentStarRating, setCurrentStarRating] = useState(0);
  const [hoverStarRating, setHoverStarRating] = useState(0);

  const handleMouseClickStarRating = (index) => {
    setCurrentStarRating(index);
  };

  const handleMouseHoverStarRating = (index) => {
    setHoverStarRating(index);
  };
  const handleMouseLeaveStarRating = () => {
    setHoverStarRating(currentStarRating);
  };

  return (
    <div className="star-rating-container">
      <div className="star-wrapper">
        {[...Array(starRatingSize)].map((_, index) => {
          index++;
          return (
            <div key={index} className="star-item">
              <span
                key={index}
                className={`single-star ${
                  index <= (hoverStarRating || currentStarRating)
                    ? "active"
                    : "inactive"
                }`}
                onClick={() => handleMouseClickStarRating(index)}
                onMouseMove={() => handleMouseHoverStarRating(index)}
                onMouseLeave={() => handleMouseLeaveStarRating()}
              >
                &#9733;
              </span>
            </div>
          );
        })}
      </div>
      <div>
        <h2>The current star rating : {currentStarRating}</h2>
      </div>
    </div>
  );
}

export default StarRating;

// understand this small logic how on  mouse hover rating changes and on mouse leave it shows previous rating
/*
initially logic was something like this 
first Approach: on Hover star rating was not reflecting

index <=(currentStarRating || hoverStarRating) ? 'active' : 'inactive'
 Explanation: - as currentStarRating was already set and because of that currentStarRating used to be always truthy (non-zero) and it ignores hoverStarRating

 - Fix was to keep hoverStarRating first and then currentStarRating like this 
 index < = (hoverStarRating || currentStarRating) ? 'active' : 'inactive'
 Explanation - here on mouse hover , hoverStarRating is always truthy (non-zero) and always ignores the currentStarRating

 Second Approach: use ternary operator instead of pipe || but need to keep hoverStarRating at first 

 index <= (hoverStarRating ? hoverStarRating : currentStarRating) ? 'active' : 'inactive'
 */
