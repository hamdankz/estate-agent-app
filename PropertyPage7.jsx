import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { usePropertyContext } from "../../Context/PropertyContext";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import img1 from "../../assets/Prop7-images/image1.jpeg";
import img2 from "../../assets/Prop7-images/image2.jpeg";
import img3 from "../../assets/Prop7-images/image3.jpeg";
import img4 from "../../assets/Prop7-images/image4.jpeg";
import img5 from "../../assets/Prop7-images/image5.jpeg";
import img6 from "../../assets/Prop7-images/image6.jpeg";
import img7 from "../../assets/Prop7-images/image7.jpeg";

// Array containing all property images for the slideshow
const propertyImages = [img1, img2, img3, img4, img5, img6, img7];

function PropertyPage7() {
  // Get favorites functionality from context - this allows adding/removing favorites
  const { favourites, addFavourite, removeFavourite } = usePropertyContext();

  // PROPERTY DATA FOR THIS PAGE
  // Hardcoded property object for this specific property page
  const property = {
    id: 1,  // Unique identifier for this property
    picture: img1,  // Main image
    type: "3 Bedroom Semi Detached",  // Property type
    price: 750000,  // Property price
    location: "Petts Wood Road, Orpington",  // Location
  };

  // Check if this property is already in favorites
  // .some() returns true if any favorite has the same id as this property
  const isFavourited = favourites.some((p) => p.id === property.id);

  // State to track which image is currently displayed in the slideshow
  const [currentImage, setCurrentImage] = useState(0);

  // Function to show next image in slideshow
  // Uses modulo operator to loop back to first image after last
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % propertyImages.length);

  // Function to show previous image in slideshow
  // Adds propertyImages.length before modulo to handle negative values
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);

  return (
    <>
      <Header />

      {/* Button to return to search page */}
      <button className="return-btn">
        <Link to="/search">Return to Search Page</Link>
      </button>

      <div className="container">
        <div className="tabs-container">
          {/* React-tabs component for tabbed interface */}
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
                {/* LEFT: Slideshow section */}
                <div className="property-images">
                  {/* Left arrow button for previous image */}
                  <button className="image-arrow left" onClick={prevImage}>❮</button>

                  {/* Main property image that changes based on currentImage state */}
                  <img
                    src={propertyImages[currentImage]}
                    alt="Property"
                    className="property-main-image"
                  />

                  {/* Right arrow button for next image */}
                  <button className="image-arrow right" onClick={nextImage}>❯</button>
                </div>

                {/* RIGHT: Property information section */}
                <div className="property-details">
                  <h1>House in Petts Wood Road, Petts Wood, Orpington BR5</h1>
                  <p className="property-price">£750,000</p>
                  <p>Bedrooms: 3</p>
                  <p>Tenure: Freehold</p>

                  {/* ============= FAVOURITE BUTTON ============= */}
                  {/* Button that toggles favorite status */}
                  {/* CSS class changes based on isFavourited state */}
                  <button
                    className={`fav-btn ${isFavourited ? "favourited" : ""}`}
                    onClick={() => {
                      // If already favorited, remove it; otherwise add it
                      if (isFavourited) {
                        removeFavourite(property);
                      } else {
                        addFavourite(property);
                      }
                    }}
                  >
                    {/* Button text changes based on favorite status */}
                    {isFavourited ? "Remove from Favourites" : "Add to Favourites"}
                  </button>

                  {/* THUMBNAILS - Small clickable preview images */}
                  <div className="thumbnail-row">
                    {/* Map through all property images to create thumbnails */}
                    {propertyImages.map((img, index) => (
                      <img
                        key={index}  // Unique key for React list rendering
                        src={img}
                        alt="Thumbnail"
                        // Apply 'active-thumb' class to current image thumbnail
                        className={`thumbnail ${index === currentImage ? "active-thumb" : ""}`}
                        // Clicking thumbnail sets it as current image
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

              </div>
            </TabPanel>

            {/* ---------------- MAP TAB ---------------- */}
            <TabPanel>
              <div className="property-map-full">
                <h2>Location</h2>
                {/* Embedded Google Maps iframe */}
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

export default PropertyPage7;