import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { usePropertyContext } from "../../Context/PropertyContext";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// PROPERTY 6 IMAGES
import img1 from "../../assets/Prop6-images/image1.jpeg";
import img2 from "../../assets/Prop6-images/image2.jpeg";
import img3 from "../../assets/Prop6-images/image3.jpeg";
import img4 from "../../assets/Prop6-images/image4.jpeg";
import img5 from "../../assets/Prop6-images/image5.jpeg";
import img6 from "../../assets/Prop6-images/image6.jpeg";
import img7 from "../../assets/Prop6-images/image7.jpeg";
import img8 from "../../assets/Prop6-images/image8.jpeg";
import floorplan from "../../assets/Prop1-images/floorplan.jpeg";

// Slideshow images
const propertyImages = [img1, img2, img3, img4, img5, img6, img7, img8];

function PropertyPage6() {
  const { favourites, addFavourite, removeFavourite } = usePropertyContext();

  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch PROPERTY 6 from properties.json
  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const prop = data.properties.find((p) => p.id === "prop6");
        setProperty(prop || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Slideshow controls
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % propertyImages.length);

  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length
    );

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
          Loading property...
        </p>
        <Footer />
      </>
    );
  }

  // Property not found
  if (!property) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
          Property not found.
        </p>
        <Footer />
      </>
    );
  }

  const isFavourited = favourites.some((p) => p.id === property.id);

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

            {/* ---------- PHOTOS TAB ---------- */}
            <TabPanel>
              <br />
              <div className="property-top-row">
                <div className="property-images">
                  <button className="image-arrow left" onClick={prevImage}>
                    ❮
                  </button>

                  <img
                    src={propertyImages[currentImage]}
                    alt={property.type}
                    className="property-main-image"
                  />

                  <button className="image-arrow right" onClick={nextImage}>
                    ❯
                  </button>
                </div>

                <div className="property-details">
                  <h1>
                    {property.type} in {property.location}
                  </h1>

                  <p className="property-price">
                    {property["displayed-price"] ||
                      `£${property.price?.toLocaleString()}`}
                  </p>

                  <p>Bedrooms: {property.bedrooms}</p>
                  <p>Tenure: {property.tenure}</p>

                  <button
                    className={`fav-btn ${isFavourited ? "favourited" : ""}`}
                    onClick={() =>
                      isFavourited
                        ? removeFavourite(property)
                        : addFavourite(property)
                    }
                  >
                    {isFavourited
                      ? "Remove from Favourites"
                      : "Add to Favourites"}
                  </button>

                  <div className="thumbnail-row">
                    {propertyImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail ${
                          index === currentImage ? "active-thumb" : ""
                        }`}
                        onClick={() => setCurrentImage(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* ---------- DESCRIPTION TAB ---------- */}
            <TabPanel>
              <div className="property-large-description">
                <h2>Description:</h2>
                <p>
                  {property.longdescription ||
                    property.description ||
                    "No description available."}
                </p>
              </div>
            </TabPanel>

            {/* ---------- FLOORPLAN TAB ---------- */}
            <TabPanel>
              <div className="fp-section">
                <h2>Floorplan:</h2>
                <img
                  className="FloorplanImage"
                  src={floorplan}
                  alt="Floorplan"
                />
              </div>
            </TabPanel>

            {/* ---------- MAP TAB ---------- */}
            <TabPanel>
              <div className="property-map-full">
                <h2>Location</h2>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                    property.location
                  )}`}
                  className="displayMaps"
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

export default PropertyPage6;
