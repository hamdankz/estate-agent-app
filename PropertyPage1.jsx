import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { usePropertyContext } from "../../Context/PropertyContext"; //ALLOWS ACCESS TO FAVOURITES

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import img1 from "../../assets/Prop1-images/image1.jpeg";
import img2 from "../../assets/Prop1-images/image2.jpeg";
import img3 from "../../assets/Prop1-images/image3.jpeg";
import img4 from "../../assets/Prop1-images/image4.jpeg";
import img5 from "../../assets/Prop1-images/image5.jpeg";
import img6 from "../../assets/Prop1-images/image6.jpeg";
import img7 from "../../assets/Prop1-images/image7.jpeg";
import floorplan from "../../assets/Prop1-images/floorplan.jpeg";


//ARRAY CONTAINING ALL IMAGES
const propertyImages = [img1, img2, img3, img4, img5, img6, img7];

function PropertyPage1() {
  const { favourites, addFavourite, removeFavourite } = usePropertyContext();
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true); //STATE IS CURRENTLY LOADING

  //FETCH PROPERTY FROM JSON FILE
  useEffect(() => {
    fetch("/properties.json") //USE PROPERTY JSON FILE
      .then((res) => res.json()) //CONVERT TO JAVASCRIPT
      .then((data) => {
        const prop = data.properties.find((p) => p.id === "prop1"); //FIND THE PROPERTY WITH SAME ID 'PROP1'
        setProperty(prop || null); //STORE THIS PROPERTY, OR NULL IF NOT FOUND
      })
      .catch((err) => console.error(err)) //LOG ANY ERRORS
      .finally(() => setLoading(false)); //SINCE FOUND, SET STATUS TO NOT LOADING
  }, []);

  //SLIDESHOW
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % propertyImages.length); //CURRENT IMAGE + 1 | % MEANS LOOP THROUGH IMAGES BACK TO START
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length); //MOVES TO PREVIOUS IMAGE

  //IF IN LOADING STATUS / WHEN PROPERTY IS BEING SEARCHED
  if (loading) {
    return (
      <>
        <Header />
        <p>
          Loading property...
        </p>
        <Footer />
      </>
    );
  }

  //IF A PROPERTY IS NOT FOUND
  if (!property) {
    return (
      <>
        <Header />
        <p>
          Property not found.
        </p>
        <Footer />
      </>
    );
  }

  //CHECKS IF PROPERTY ID IS FOUND IN FAVOURITE LIST
  const isFavourited = favourites.some((p) => p.id === property.id);

  return (
    <>
      <Header />

      <button className="return-btn">
        <Link to="/search">Return to Search Page</Link>
      </button>

      <div className="container">
        <div className="tabs-container"> {/* TABS FOR ALL COMPONENTS OF PAGE */}
          <Tabs>
            <TabList>
              <Tab>Photos</Tab>
              <Tab>Description</Tab>
              <Tab>Floorplan</Tab>
              <Tab>Maps</Tab>
            </TabList>

            {/* PHOTOS TAB */}
            <TabPanel>
              <br />
              <div className="property-top-row">
                <div className="property-images">
                  <button className="image-arrow left" onClick={prevImage}>❮</button> {/* BUTTON TO DISPLAY PREVIOUS IMAGE */}
                  <img
                    src={propertyImages[currentImage]} //DISPLAY CURRENT IMAGE
                    alt={property.type || "Property"}
                    className="property-main-image"
                  />
                  <button className="image-arrow right" onClick={nextImage}>❯</button> {/* BUTTON TO DISPLAY MNEXT IMAGE */}
                </div>

                <div className="property-details">
                  <h1>{property.type} in {property.location}</h1> {/*DISPLAY TYPE AND LOCATION */}
                  <p className="property-price">
                    {property["displayed-price"] || `£${property.price?.toLocaleString()}`} {/*DISPLAY PRICE IN GOOD FROMAT USING TOLOCATESTRING */}
                  </p>
                  <p>Bedrooms: {property.bedrooms || "N/A"}</p> {/*DISPLAY BEDROOMS IF FOUND, ELSE DISPLAY NULL*/}
                  <p>Tenure: {property.tenure || "N/A"}</p>   {/*DISPLAY TENURE IF FOUND, ELSE DISPLAY NULL*/}

                  <button
                    className={`fav-btn ${isFavourited ? "favourited" : ""}`} //IF FAVOURITED, DISPLAY THAT ITS FAVOURITED
                    onClick={() => {
                      if (isFavourited) removeFavourite(property); //IF FAVOURITED AND BUTTON CLICKED, REMOVE FAVOURITE
                      else addFavourite(property); //IF NOT FAVOURITED AND IS CLICKED, ADD TO FAVOURITE
                    }}
                  >
                    {isFavourited ? "Remove from Favourites" : "Add to Favourites"} {/*DISPLAY DIFFERENT BUTTONS BASED ON SITUATION*/}
                  </button>

                {/*DISPLAY ALL IMAGES IN MINI FORMAT*/}
                  <div className="thumbnail-row">
                    {propertyImages.map((img, index) => ( //MAP GOES THORUGH ALL IMAGES
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`} 
                        className={`thumbnail ${index === currentImage ? "active-thumb" : ""}`} //SPECIAL CLASS FOR THE CURRENT IMAGE
                        onClick={() => setCurrentImage(index)} //IF CLICKED ON THUMBNAIL, SET THE IMAGE TO THAT SELECTED ONE
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* DESCRIPTION TAB */}
            <TabPanel>
              <div className="property-large-description">
                <h2>Description:</h2>
                <p>{property.longdescription || property.description || "No description available."}</p>
              </div>
            </TabPanel>

            {/* FLOORPLAN TAB */}
            <TabPanel>
              <div className="fp-section">
                <h2>Floorplan:</h2>
                <img className="FloorplanImage" src={floorplan} alt="Floorplan" />
              </div>
            </TabPanel>

            {/* MAP TAB */}
            <TabPanel>
              <div className="property-map-full">
                <h2>Location</h2>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(property.location)}`}
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

export default PropertyPage1;
