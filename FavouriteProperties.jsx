import { useState, useRef } from "react";
import ListItems from "./ListItems";
import { usePropertyContext } from "../Context/PropertyContext";

function FavouriteProperties() {
  const [isDragOver, setIsDragOver] = useState(false); //TRACKS WHEN SOMETHING ENTERS THE DROP ZONE
  const [outsideDropZone, setOutsideDropZone] = useState({}); //STORES THE FAVOURITE ITEMS BEING DRAGGED OUT
  const { favourites, addFavourite, removeFavourite, clearFavourites } = usePropertyContext();
  const dropZoneRef = useRef(null); //REFERENCE TO DROP ZONE

  //ALLOWS DRAGGING IN
  const handleDragOver = (e) => {
    e.preventDefault(); //DEFAULT BROWSER BEHAVIOUR IS CANCELLED
    setIsDragOver(true); //DRAG IN FEATURES SET TRUE
  };

  //DRAGGING CANCELS WHEN OUT OF ZONE
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  //IF DROPPED IN:
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false); //REMOVE DRAG IN FEATURES
    const data = e.dataTransfer.getData("application/json"); //READ DATA
    if (data) addFavourite(JSON.parse(data)); //IF FOUND, ADD TO FAVOURITE
  };

  //WHEN DRAGGING BEGING:
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
  };


  //WHILE DRAGGING:
  const handleDrag = (e, item) => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;
    const rect = dropZone.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isInside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;

    setOutsideDropZone((prev) => ({
      ...prev,
      [item.type + item.price]: !isInside,
    }));
  };

  const handleDragEnd = (e, item) => {
    if (outsideDropZone[item.type + item.price]) {
      removeFavourite(item);
    }
    setOutsideDropZone((prev) => {
      const copy = { ...prev };
      delete copy[item.type + item.price];
      return copy;
    });
  };

  return (
    <div className="favourites-section">
      <h2>Favourite Properties</h2>

      <div
        ref={dropZoneRef} //THE DROP ZONE REFFERED TO IN THE BEGINNING
        className={`favouriteDropZone ${isDragOver ? "dragOver" : ""}`} //DIFFERENT CLASS NAMES DEPENDS ON IF DRAGGED OVER OR NOT (FOR CSS STYLING)
        onDragOver={handleDragOver} //CONNECTING HANDLERS
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Drag properties here to add to favourites
      </div>

      {favourites.length > 0 && ( //IF THERE ARE FAVOURITE PROPERTIES (MORE THAN 0)
        <button className="ClearBtn" onClick={clearFavourites}> 
          Clear All
        </button> //BUTTON THAT IF CLICKED, FOLLOWS CLEARFAVOURITE INSTRUCTIONS
      )}

      {favourites.length === 0 ? (
        <p>No favourite properties yet.</p> //IF THERE ARE NO FAVOURITE PROPERTIES
      ) : ( //ELSE THERE ARE FAVOURITE PROPERTIES, IN WHICH CASE, LIST THEM
        <ListItems 
          items={favourites} 
          renderItem={(p) => {
            const key = p.type + p.price;
            const isOutside = outsideDropZone[key];
            return (
              <div
                className={`favouriteItem ${isOutside ? "outsideZone" : ""}`} //GIVE A CLASS DEPENDING IF IN ZONE OR NOT
                draggable
                onDragStart={(e) => handleDragStart(e, p)}
                onDrag={(e) => handleDrag(e, p)}
                onDragEnd={(e) => handleDragEnd(e, p)}
              >
                
                <img src={p.picture} alt={p.type} /> 
                <div> 
                  <strong> 
                    {p.type} - £{p.price.toLocaleString()}
                  </strong>
                  <div style={{ fontSize: "12px" }}>{p.location}</div>
                </div>
                <button onClick={() => removeFavourite(p)}>Remove</button>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default FavouriteProperties;
