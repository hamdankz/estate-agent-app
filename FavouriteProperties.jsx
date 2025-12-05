import { useState } from "react";
import ListItems from "./ListItems";

function FavouriteProperties({ favouriteProperties, removeFavourite, onDrop, clearFavourites }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  // When something is dragged over the favourite zone
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // When something is dropped INTO favourites
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const data = e.dataTransfer.getData("application/json");
    if (data) onDrop(JSON.parse(data));
  };

  // Called when user starts dragging a favourite property OUT
  const handleFavouriteDragStart = (property) => {
    setDraggedItem(property);
  };

  // Called when drag ends ANYWHERE
  const handleFavouriteDragEnd = (e) => {
    // If drag ended *outside* the favourites box → remove from favourites
    const favouritesBox = e.target.closest(".favourites-section");

    if (!favouritesBox) {
      removeFavourite(draggedItem);
    }

    setDraggedItem(null);
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

      <button className="ClearBtn" onClick={clearFavourites}>
        Clear All
      </button>

      {favouriteProperties.length === 0 ? (
        <p>No favourite properties yet.</p>
      ) : (
        <ListItems
          items={favouriteProperties}
          renderItem={(p) => (
            <div
              className="favouriteItem"
              draggable
              onDragStart={() => handleFavouriteDragStart(p)}
              onDragEnd={handleFavouriteDragEnd}
            >
              <img src={p.picture} alt={p.type} />

              <div>
                <strong>{p.type} - £{p.price.toLocaleString()}</strong>
                <div style={{ fontSize: "12px" }}>{p.location}</div>
              </div>

              <button onClick={() => removeFavourite(p)}>Remove</button>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default FavouriteProperties;
