import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "../Context/PropertyContext"; // Import context

function PropertyCard({ property, showRemove = false }) {
  const navigate = useNavigate();
  const { addFavourite, removeFavourite, isFavourited } = usePropertyContext(); // Get from context

  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(property));
  };

  const handleClick = () => {
    navigate(`/property/${property.id}`); 
  };

  return (
    <div
      className="property-card"
      draggable={!showRemove}
      onDragStart={handleDragStart}
      onClick={handleClick}
      style={{ cursor: !showRemove ? "pointer" : "default" }}
    >
      <img
        src={property.picture}
        alt={property.type}
        className="property-image"
        draggable={false}
      />

      <div className="property-info">
        <div className="property-type">{property.type}</div>
        <div className="property-location">{property.location}</div>
        <div className="property-price">£{property.price.toLocaleString()}</div>
        <div className="card-description">{property.description}</div>

        <div className="property-action">
          {showRemove ? (
            <button onClick={(e) => { e.stopPropagation(); removeFavourite(property); }}>
              Remove
            </button>
          ) : (
            <button
              className={`btn ${isFavourited(property.id) ? "btn-disabled" : "btn-primary"}`}
              onClick={(e) => { e.stopPropagation(); addFavourite(property); }}
              disabled={isFavourited(property.id)}
            >
              {isFavourited(property.id) ? "Favourited" : "Add to Favourite"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;