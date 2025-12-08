import { createContext, useContext, useEffect, useState } from "react";

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  // Load favourites from localStorage on first load
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Add favourite
  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.some((p) => p.id === property.id)) return prev; // avoid duplicates
      return [...prev, property];
    });
  };

  // Remove favourite
  const removeFavourite = (property) => {
    setFavourites((prev) => prev.filter((p) => p.id !== property.id));
  };

  // Clear all favourites
  const clearFavourites = () => setFavourites([]);

  // Check if property is favourited
  const isFavourited = (id) => favourites.some((p) => p.id === id);

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

