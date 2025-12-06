import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { usePropertyContext } from "../../Context/PropertyContext";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import img1 from "../../assets/Prop1-images/image1.jpeg";
import img2 from "../../assets/Prop1-images/image2.jpeg";
import img3 from "../../assets/Prop1-images/image3.jpeg";
import img4 from "../../assets/Prop1-images/image4.jpeg";
import img5 from "../../assets/Prop1-images/image5.jpeg";
import img6 from "../../assets/Prop1-images/image6.jpeg";
import img7 from "../../assets/Prop1-images/image7.jpeg";
import floorplan from "../../assets/Prop1-images/floorplan.jpeg";

const propertyImages = [img1, img2, img3, img4, img5, img6, img7];

function PropertyPage1() {
  const { favourites, addFavourite, removeFavourite } = usePropertyContext();

  // PROPERTY DATA FOR THIS PAGE
  const property = {
    id: 1,
    picture: img1,
    type: "3 Bedroom Semi Detached",
    price: 750000,
    location: "Petts Wood Road, Orpington",
  };

  const isFavourited = favourites.some((p) => p.id === property.id);

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % propertyImages.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);

  return (
    <>
      <Header />

      <button className="return-btn">
        <Link to="/search">Return to Search Page</Link>
      </button>

      <div className="container">
        <div className="tabs-container">
          <Tabs>
            <TabList>
              <Tab>Photos</Tab>
              <Tab>Description</Tab>
              <Tab>Floorplan</Tab>
              <Tab>Maps</Tab>
            </TabList>

            {/* ---------------- PHOTOS TAB ---------------- */}
            <TabPanel>
              <br />

              <div className="property-top-row">
                {/* LEFT: Slideshow */}
                <div className="property-images">
                  <button className="image-arrow left" onClick={prevImage}>❮</button>

                  <img
                    src={propertyImages[currentImage]}
                    alt="Property"
                    className="property-main-image"
                  />

                  <button className="image-arrow right" onClick={nextImage}>❯</button>
                </div>

                {/* RIGHT: INFO */}
                <div className="property-details">
                  <h1>House in Petts Wood Road, Petts Wood, Orpington BR5</h1>
                  <p className="property-price">£750,000</p>
                  <p>Bedrooms: 3</p>
                  <p>Tenure: Freehold</p>

                  {/* ============= FAVOURITE BUTTON ============= */}
                  <button
                    className={`fav-btn ${isFavourited ? "favourited" : ""}`}
                    onClick={() => {
                      if (isFavourited) {
                        removeFavourite(property);
                      } else {
                        addFavourite(property);
                      }
                    }}
                  >
                    {isFavourited ? "Remove from Favourites" : "Add to Favourites"}
                  </button>

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
                </div>
              </div>
            </TabPanel>

            {/* ---------------- DESCRIPTION TAB ---------------- */}
            <TabPanel>
              <div className="property-large-description">
                <h2>Description:</h2>
                <p>
                  This attractive three-bedroom semi-detached family home is situated on the ever-popular Petts Wood Road...
                </p>
              </div>
            </TabPanel>

            {/* ---------------- FLOORPLAN TAB ---------------- */}
            <TabPanel>
              <div className="fp-section">
                <h2>Floorplan:</h2>
                <img className="FloorplanImage" src={floorplan} alt="" />
              </div>
            </TabPanel>

            {/* ---------------- MAP TAB ---------------- */}
            <TabPanel>
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
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PropertyPage1;
