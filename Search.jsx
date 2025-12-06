import { useState, useEffect, useCallback } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Filter from "../Components/Filter";
import Properties from "../Components/Properties";
import FavouriteProperties from "../Components/FavouriteProperties";
import { usePropertyContext } from "../Context/PropertyContext";

function Search() {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // --------------------------
  // Get shared favourites from context
  // --------------------------
  const { favourites, addFavourite, removeFavourite, clearFavourites } =
    usePropertyContext();

  // --------------------------
  // Load all properties on mount
  // --------------------------
  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => setAllProperties(data.properties))
      .catch((err) => console.error("Error loading properties:", err));
  }, []);

  // --------------------------
  // Search handler
  // --------------------------
  const handleSearch = useCallback(
    (filters) => {
      const monthMap = {
        January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
        July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
      };

      let results = [...allProperties];

      if (filters.type) {
        results = results.filter((p) => p.type === filters.type);
      }

      if (filters.postcode?.trim()) {
        const searchValue = filters.postcode.toLowerCase();
        results = results.filter((p) =>
          p.location.toLowerCase().includes(searchValue)
        );
      }

      if (filters.minPrice) {
        results = results.filter((p) => p.price >= Number(filters.minPrice));
      }

      if (filters.maxPrice) {
        results = results.filter((p) => p.price <= Number(filters.maxPrice));
      }

      if (filters.minBeds) {
        results = results.filter((p) => p.bedrooms >= Number(filters.minBeds));
      }

      if (filters.maxBeds) {
        results = results.filter((p) => p.bedrooms <= Number(filters.maxBeds));
      }

      if (filters.dateAdded) {
        const selectedDate = new Date(filters.dateAdded);
        results = results.filter((p) => {
          const addedDate = new Date(
            p.added.year,
            monthMap[p.added.month] - 1,
            p.added.day
          );
          return addedDate >= selectedDate;
        });
      }

      setFilteredProperties(results);
      setSearchPerformed(true);
    },
    [allProperties]
  );

  return (
    <>
      <Header />

      <div className="search-page-container">
        {/* Left Column */}
        <div className="search-left">
          <Filter onSearch={handleSearch} />

          {searchPerformed && (
            filteredProperties.length > 0 ? (
              <Properties
                properties={filteredProperties}
                onFavourite={addFavourite}
                onRemoveFavourite={removeFavourite}
                favouriteProperties={favourites}
              />
            ) : (
              <p style={{ color: "white", marginTop: "20px" }}>
                No properties found. Adjust your filters and click Search.
              </p>
            )
          )}
        </div>

        {/* Right Column */}
        <FavouriteProperties
          favouriteProperties={favourites}
          removeFavourite={removeFavourite}
          onDrop={addFavourite}
          clearFavourites={clearFavourites}
        />
      </div>

      <Footer />
    </>
  );
}

export default Search;
