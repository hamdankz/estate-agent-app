import { useState } from "react";
import ListItems from "./ListItems";
import { usePropertyContext } from "../Context/PropertyContext"; // Import context

function FavouriteProperties() { // Remove all props
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Get data from context instead of props
  const { favourites, addFavourite, removeFavourite, clearFavourites } = usePropertyContext();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      addFavourite(JSON.parse(data)); // Use addFavourite from context
    }
  };

  return (
    <div className="favourites-section">
      <h2>Favourite Properties</h2>

      <div
        className={`favouriteDropZone ${isDragOver ? "dragOver" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Drag properties here to add to favourites
      </div>

      {/* ONLY show Clear All button when there ARE favorites */}
      {favourites.length > 0 && ( // Use favourites from context
        <button className="ClearBtn" onClick={clearFavourites}> {/* Use clearFavourites from context */}
          Clear All
        </button>
      )}

      {favourites.length === 0 ? ( // Use favourites from context
        <p>No favourite properties yet.</p>
      ) : (
        <ListItems
          items={favourites} // Use favourites from context
          renderItem={(p) => (
            <div className="favouriteItem">
              <img src={p.picture} alt={p.type} />
              <div>
                <strong>{p.type} - £{p.price.toLocaleString()}</strong>
                <div style={{ fontSize: "12px" }}>{p.location}</div>
              </div>
              <button onClick={() => removeFavourite(p)}>Remove</button> {/* Use removeFavourite from context */}
            </div>
          )}
        />
      )}
    </div>
  );
}

export default FavouriteProperties;