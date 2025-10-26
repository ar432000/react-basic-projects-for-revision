import { useEffect, useState, useRef } from "react";

//load css
import "./loadData.css";
function LoadData() {
  // url- https://dummyjson.com/products?limit=20&skip=10
  const PAGE_SIZE = 50;
  const [products, setProducts] = useState([]);
  const [loadCount, setLoadCount] = useState(0);
  const [disableLoadButton, setDisableLoadButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);
  const [dataObject, setDataObject] = useState(null);
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${
            loadCount === 0 ? 0 : loadCount * PAGE_SIZE
          }`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data && data.products && data.products.length) {
          setProducts((prevData) => [...prevData, ...data.products]);
          setDataObject(data);
          setLoading(false);

          // Scroll to new products after a brief delay to ensure DOM update
          if (loadCount > 0) {
            setTimeout(() => {
              if (loadMoreRef.current) {
                loadMoreRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }, 100);
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      }
      //finally {
      //   setLoading(false);
      // }
    };

    fetchProducts();
    return () => controller.abort();
  }, [loadCount]);

  useEffect(() => {
    if (dataObject && typeof dataObject.total === "number") {
      setDisableLoadButton(products.length === dataObject.total);
    }
  }, [products, dataObject]);
  if (loading)
    return <div className="products-loader">Products is loading ...</div>;
  return (
    <div className="load-more-container">
      <div>
        <h3>This is the product listing page..</h3>
      </div>
      <div className="product-container">
        {products && products.length
          ? products.map((product, index) => (
              <div
                key={index}
                className="product"
                ref={
                  index === products.length - 20 && index > 0
                    ? loadMoreRef
                    : null
                }
              >
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <p>{product.description}</p>
                </div>
              </div>
            ))
          : null}
        {loading && (
          <div className="products-loader">Loading more products...</div>
        )}
      </div>
      <div className="button-container">
        <button
          disabled={disableLoadButton || loading}
          onClick={() => setLoadCount((prev) => prev + 1)}
        >
          {loading ? "Loading..." : "Load Next Data"}
        </button>
        {disableLoadButton ? (
          <p>You have reached the end of products.</p>
        ) : null}
      </div>
    </div>
  );
}

export default LoadData;
