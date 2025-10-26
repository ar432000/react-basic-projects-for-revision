import { useState, useEffect } from "react";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

// css import
import "./ImageSlider.css";
function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLeft = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleRight = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };
  const fetchImages = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=5"
      );
      const data = await response.json();
      if (data) {
        console.log(data);
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  if (loading)
    return (
      <div className="loader">
        <h3>Loading...</h3>
      </div>
    );
  if (errorMsg !== "")
    return (
      <div>{`There seems some error while calling the url. ${errorMsg}`}</div>
    );
  return (
    <div className={loading ? "hide-container" : "container"}>
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handleLeft}
      />
      {images && images.length > 0
        ? images.map((img, index) => (
            <img
              key={img.id}
              src={img.download_url}
              alt={img.url}
              className={
                currentImage === index
                  ? "current-image"
                  : "current-image hide-rest-images"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleRight}
      />
      <span className="circle-indicators">
        {images &&
          images.map((_, index) => (
            <button
              key={index}
              className={
                currentImage === index
                  ? "current-indicator"
                  : "current-indicator inactive"
              }
              onClick={() => setCurrentImage(index)}
            ></button>
          ))}
      </span>
    </div>
  );
}

export default ImageSlider;
