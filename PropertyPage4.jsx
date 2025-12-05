import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import img1 from "../../assets/Prop4-images/image1.jpeg";
import img2 from "../../assets/Prop4-images/image2.jpeg";
import img3 from "../../assets/Prop4-images/image3.jpeg";
import img4 from "../../assets/Prop4-images/image4.jpeg";
import img5 from "../../assets/Prop4-images/image5.jpeg";
import img6 from "../../assets/Prop4-images/image6.jpeg";


const propertyImages = [img1, img2, img3, img4, img5, img6];

function PropertyPage4({ property, onFavourite, onRemoveFavourite, isFavourited, showRemove = false }) {
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % propertyImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);

  return (
    <>
      <Header />

      <br />
      <br />

      <button><Link to="/search">Return to Search Page</Link></button>

      
      <div className="property-page-container">

        <div className="property-top-row">
          <div className="property-images">
            <button className="image-arrow left" onClick={prevImage}>❮</button>
            <img src={propertyImages[currentImage]} className="property-main-image" alt="" />
            <button className="image-arrow right" onClick={nextImage}>❯</button>
          </div>

          <div className="property-details">
            <h1>Flat in High Street, London NW1</h1>
            <p className="property-price">£250,000</p>
            <p>Bedrooms: 1</p>
            <p>Tenure: Leasehold</p>

            <div className="property-action">
              {showRemove ? (
                <button onClick={(e) => { e.stopPropagation(); onRemoveFavourite(property); }}>Remove</button>
              ) : (
                <button
                  className={`btn ${isFavourited ? "btn-disabled" : "btn-primary"}`}
                  onClick={(e) => { e.stopPropagation(); onFavourite(property); }}
                  disabled={isFavourited}
                >
                  {isFavourited ? "Favourited" : "Add to Favourite"}
                </button>
              )}
              <h2>Floorplan:</h2>

            </div>
          </div>
        </div>

        <div className="thumbnail-row">
          {propertyImages.map((img, index) => (
            <img key={index} src={img} className={`thumbnail ${index === currentImage ? "active-thumb" : ""}`} onClick={() => setCurrentImage(index)} />
          ))}
        </div>

        <div className="property-large-description">
          <h2>Description:</h2>
          <p>Compact 1 bedroom city flat situated in a prime London High Street location. Ideal for first-time buyers or investors, offering excellent transport links, modern fittings, and easy access to shops, restaurants, and local amenities.</p>
        </div>

        <div className="property-map-full">
          <h2>Location</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="450" style={{ border:0 }} loading="lazy"></iframe>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default PropertyPage4;
