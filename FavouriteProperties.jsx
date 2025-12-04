import { useState } from "react";
import ListItems from "./ListItems";

function FavouriteProperties({ favouriteProperties, removeFavourite, onDrop, clearFavourites }) {
  const [isDragOver, setIsDragOver] = useState(false);

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
    if (data) onDrop(JSON.parse(data));
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

      <button className="ClearBtn"
        onClick={clearFavourites}
      >
        Clear All
      </button>

      {favouriteProperties.length === 0 ? (
        <p>No favourite properties yet.</p>
      ) : (
        <ListItems
          items={favouriteProperties}
          renderItem={(p) => (
            <div className="favouriteItem">
              <img src={p.picture} alt={p.type}/>
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
