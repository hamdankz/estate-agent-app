import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { Tab, Tabs, TabList, TabPanel} from "react-tabs";

import img1 from "../../assets/Prop1-images/image1.jpeg";
import img2 from "../../assets/Prop1-images/image2.jpeg";
import img3 from "../../assets/Prop1-images/image3.jpeg";
import img4 from "../../assets/Prop1-images/image4.jpeg";
import img5 from "../../assets/Prop1-images/image5.jpeg";
import img6 from "../../assets/Prop1-images/image6.jpeg";
import img7 from "../../assets/Prop1-images/image7.jpeg";
import floorplan from "../../assets/Prop1-images/floorplan.jpeg";

const propertyImages = [img1, img2, img3, img4, img5, img6, img7];

function PropertyPage1({
  property,
  onFavourite,
  onRemoveFavourite,
  isFavourited,
  showRemove = false,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % propertyImages.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);

  return (
    <>
      <Header />

      <button className="return-btn"><Link to="/search">Return to Search Page</Link></button>

<div className="container">

<div className="tabs-container">


      <Tabs>
        <TabList>
            <Tab>Photos</Tab>
            <Tab>Description</Tab>
            <Tab>Floorplan</Tab>
            <Tab>Maps</Tab>
        </TabList>

        <TabPanel>
          <br />
                              {/* TOP ROW */}
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

            {/* RIGHT: Details */}
            <div className="property-details">
              <h1>House in Petts Wood Road, Petts Wood, Orpington BR5</h1>
              <p className="property-price">£750,000</p>
              <p>Bedrooms: 3</p>
              <p>Tenure: Freehold</p>


              {showRemove ? (
  <button
    className="fav-btn remove-btn"
    onClick={(e) => {
      e.stopPropagation();
      onRemoveFavourite(property);
      alert("Removed from favourites");
    }}
  >
    Remove
  </button>
) : (
  <button
    className={`fav-btn ${isFavourited ? "favourited" : ""}`}
    onClick={(e) => {
      e.stopPropagation();
      if (!isFavourited) {
        alert("Added to Favourites!");
        onFavourite(property);
      }
    }}
    disabled={isFavourited}
  >
    {isFavourited ? "Favourited" : "Add to Favourite"}
  </button>
)}


              

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


        <TabPanel>
                  {/* DESCRIPTION */}
        <div className="property-large-description">
          <h2>Description:</h2>
          <p>This attractive three-bedroom semi-detached family home is situated on the ever-popular Petts Wood Road, just a short walk from local amenities, green spaces, and excellent transport links. Beautifully maintained throughout, the property offers generous and versatile living accommodation ideal for modern family life. <br /> <br />
              Upon entering, you are welcomed by a bright hallway leading into a spacious through-lounge featuring a large front-facing bay window, tasteful décor, and plenty of natural light. The living area flows through to a comfortable dining space positioned at the rear of the home, making it perfect for family meals and entertaining guests. The modern fitted kitchen offers ample storage, worktop space, and integrated appliances, with direct access out to the garden. <br /> <br />
              Upstairs, the property includes two well-proportioned double bedrooms and a third bedroom which is ideal for a child’s room, nursery, or home office. A contemporary family bathroom serves all three bedrooms and has been finished to a high standard. <br /> <br />
              Outside, the rear garden is a standout feature—well maintained, private, and complete with a patio area for outdoor dining and relaxation. The front of the property provides off-street parking via a private driveway. <br /> <br />
              Located within the sought-after community of Petts Wood, the home benefits from easy access to Petts Wood Station with fast services into Central London, as well as a choice of highly regarded schools, local shops, cafés, and leafy parks. This is an excellent opportunity for families seeking a comfortable, spacious home in a desirable and well-connected neighbourhood.</p>
        </div>
        </TabPanel>

        <TabPanel>
          <div className="fp-section">
          <h2>Floorplan:</h2>
          <img className="FloorplanImage" src={floorplan} alt="" />
          </div>
        </TabPanel>

        <TabPanel>
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
        </TabPanel>
      </Tabs>

      
      </div>
      </div>

      <Footer />
    </>
  );
}

export default PropertyPage1;
