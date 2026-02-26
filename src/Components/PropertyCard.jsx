import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "../Context/PropertyContext";

function PropertyCard({ property, showRemove = false }) { //SHOW REMOVE IS FALSE, ONLY SET TRUE WHEN RULES ARE MET
  const navigate = useNavigate();
  const { addFavourite, removeFavourite, isFavourited } = usePropertyContext(); //FUNCTIONS FROM PROPERTY CONTEXT

  if (!property) { //IF NO PROPERTY IS FOUND
    return ( //DISPLAY MESSAGE TO SAY NO PROPERTIES ARE FOUND
      <div className="property-card property-card-error">
        <div className="property-info">
          <div className="property-type">Property not available</div>
          <div className="property-location">This property could not be loaded</div>
        </div>
      </div>
    );
  }

  //WHEN DRAG STARTS, STORE PROPERTY DATA 
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(property));
  };

  //IF PROPERTY IS CLICKED, NAVIGATE TO ITS PROPERTY PAGE
  const handleClick = () => {
    navigate(`/property/${property.id}`); 
  };

  // FAIL SAFE
  const safePrice = property.price ? property.price.toLocaleString() : 'Price not available'; //STORE PROPERTY PRICE OR USE BACKUP PRICE
  const safeType = property.type || 'Property'; //STORE PROPERTY TYPE OR USE BACKUP TYPE
  const safeLocation = property.location || 'Location not available'; //STORE PROPERTY LOCATION OR USE BACKUP LOCATION
  const safeDescription = property.description || 'No description available'; //STORE PROPERTY DESCRIPTION OR USE BACKUP SECRIPTION
  const safePicture = property.picture //STORE PROPERTY IMAGE

  //CHECKS IF A PROPERTY IS FAVOURITES
  const favourited = isFavourited(property.id);

  return (
    <div
      className="property-card"
      draggable={!showRemove}
      onDragStart={handleDragStart}
      onClick={handleClick}
      style={{ cursor: !showRemove ? "pointer" : "default" }}
    >
      <img
        src={safePicture}
        alt={safeType}
        className="property-image"
        draggable={false} //THE IMAGE SHOULDNT BE DRAGGED ALONE, THE ENTIRE CARD SHOULD
      />

      <div className="property-info">
        <div className="property-type">{safeType}</div>
        <div className="property-location">{safeLocation}</div>
        <div className="property-price">£{safePrice}</div>
        <div className="card-description">{safeDescription.substring(0, 100)}...</div>

        <div className="property-action">
          {showRemove ? (
            <button onClick={(e) => { e.stopPropagation(); removeFavourite(property); }}> {/* CLICK REMOVE, DO NOT OPEN PAGE, JUST REMOVE FAVOURITE */}
              Remove
            </button>
          ) : (
            <button
              className={`btn ${favourited ? "btn-remove" : "btn-primary"}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                if (favourited) {
                  removeFavourite(property); //IF FAVOURITED, REMOVE FAVOURITE
                } else {
                  addFavourite(property); //IF NOT FAVOURITED, ADD TO FAVOURITE
                }
              }}
            >
              {favourited ? "Remove from Favourites" : "Add to Favourite"} {/* DISPLAY DIFFERENT BUTTON DEPENIDNG ON SITUATION */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;