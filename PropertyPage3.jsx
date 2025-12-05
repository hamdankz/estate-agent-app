import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import img1 from "../../assets/Prop3-images/image1.jpeg";
import img2 from "../../assets/Prop3-images/image2.jpeg";
import img3 from "../../assets/Prop3-images/image3.jpeg";
import img4 from "../../assets/Prop3-images/image4.jpeg";
import img5 from "../../assets/Prop3-images/image5.jpeg";
import img6 from "../../assets/Prop3-images/image6.jpeg";
import img7 from "../../assets/Prop3-images/image7.jpeg";


const propertyImages = [img1, img2, img3, img4, img5, img6, img7];

function PropertyPage3({ property, onFavourite, onRemoveFavourite, isFavourited, showRemove = false }) {
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
        {/* TOP SECTION */}
        <div className="property-top-row">
          {/* IMAGES */}
          <div className="property-images">
            <button className="image-arrow left" onClick={prevImage}>❮</button>
            <img src={propertyImages[currentImage]} alt="Property" className="property-main-image" />
            <button className="image-arrow right" onClick={nextImage}>❯</button>
          </div>

          {/* DETAILS */}
          <div className="property-details">
            <h1>House in Green Lane, Bromley BR1</h1>
            <p className="property-price">£1,200,000</p>
            <p>Bedrooms: 4</p>
            <p>Tenure: Freehold</p>

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

        {/* THUMBNAILS */}
        <div className="thumbnail-row">
          {propertyImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`thumbnail ${index === currentImage ? "active-thumb" : ""}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        {/* DESCRIPTION */}
        <div className="property-large-description">
          <h2>Description:</h2>
          <p>Spacious 4 bedroom detached home located on the desirable Green Lane in Bromley. 
          Offering generous living space throughout, this stunning family home features multiple reception rooms, 
          modern kitchen, beautifully maintained garden, and excellent transport links into London. 
          Ideal for growing families seeking both comfort and convenience.</p>
        </div>

        {/* MAP */}
        <div className="property-map-full">
          <h2>Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PropertyPage3;
