import { createContext, useContext, useEffect, useState } from "react";

const PropertyContext = createContext(); //CREATE A CONTEXT

export function PropertyProvider({ children }) { //CHILDREN REPRESENTS ALL COMPOENNT IN PROVIDER
  //LOAD FAVOURITES FROM LOCALSTORAGE
  const [favourites, setFavourites] = useState(() => { //INITIALISE FAVOURITE STATE
    const saved = localStorage.getItem("favourites"); //USES BROWSER STORAGE FOR FAVOURITES
    return saved ? JSON.parse(saved) : []; //EITHER ADD SAVED TO AN EXISTING ARRAY, OR IF IT DONT EXIST, A NEW ARRAY
  });

  //KEEP UPDATING LOCALSTROAGE WHENEVER A CHANGE IS MADE
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites)); //CURRENT FAVOURITE LIST IS SAVED TO LOCALSTORAGE
  }, [favourites]);

  //ADD FAVOURITES
  const addFavourite = (property) => {
    setFavourites((prev) => { //USE LATEST LOCALSTORAGE SAVE
      if (prev.some((p) => p.id === property.id)) return prev; //IF ID ALREADY EXISTS IN ARRAY, NO CHANGE MADE TO LOCALSTORAGE
      return [...prev, property]; //IF NOT, ADD TO LOCALSTORAGE
    });
  };

  //REMOVE FAVOURITES
  const removeFavourite = (property) => {
    setFavourites((prev) => prev.filter((p) => p.id !== property.id)); //FILTER THROUGH ALL FAVOURITE PROPERTIES EXCEPT THE ONE BEING REMOVED
  };

  //CLEAR ALL FAVOURITES
  const clearFavourites = () => setFavourites([]); //SET LIST OF FAVOURITES AS EMPTY

  //CHECK IF A PROPERTY IS FAVOURITED
  const isFavourited = (id) => favourites.some((p) => p.id === id); //IF ID IS FOUND IN FAVOURITE PROPERTY LIST

  return (
    <PropertyContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        clearFavourites,
        isFavourited
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext() {
  return useContext(PropertyContext);
}

