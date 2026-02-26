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
  const [initialFilters, setInitialFilters] = useState(null);
  
  const { favourites, addFavourite, removeFavourite } = usePropertyContext();

  //WHEN ALL RENDERRED, LOAD PROPERTIES
  useEffect(() => {
    fetch("/properties.json") //USE PROPERTIES JSON
      .then((res) => res.json()) //CONVERT RESPONSE TO JAVASCRIPT OBJECT
      .then((data) => { //STORE THESE PROPERTIES IN PROPERTIES STATE
        setAllProperties(data.properties);
        //SEARCH WITH DEFAULT FILTERS
        performSearch(data.properties, {});
      })
      .catch((err) => console.error(err));
  }, []);

  //SEARCH FUNTION
  const performSearch = useCallback((properties, filters) => {


    const monthMap = { 
      January:1, February:2, March:3, April:4, May:5, June:6,
      July:7, August:8, September:9, October:10, November:11, December:12
    };

    let results = [...properties]; //CREATES COPY ORIGINAL ARRAY

    //EACH FILTER WORKS BY SETTING VALUES, WHICH WILL RESULT IN MATCHING PROPERTIES

    if (filters.type) results = results.filter(p => p.type === filters.type); 

    if (filters.postcode && filters.postcode.trim() !== "") { //TRIMS SPACES
      results = results.filter((p) => 
        p.location.toLowerCase().includes(filters.postcode.toLowerCase()) //MAKES THEM LOWER CASE
      );
    }

    if (filters.minPrice) results = results.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) results = results.filter(p => p.price <= Number(filters.maxPrice));
    if (filters.minBeds) results = results.filter(p => p.bedrooms >= Number(filters.minBeds));
    if (filters.maxBeds) results = results.filter(p => p.bedrooms <= Number(filters.maxBeds));

    if (filters.dateAdded) { 
      const selectedDate = new Date(filters.dateAdded); //THE DATE TO FILTER
      results = results.filter(p => {
        const addedDate = new Date(p.added.year, monthMap[p.added.month]-1, p.added.day);  //MONTH - 1 TO FIX ARRAY LIST
        return addedDate = selectedDate; //RETURN MATCHING DATES
      });
    }

    setFilteredProperties(results); //THE COPPIED ARRAY IS FILTERRED, ONLY THE FILTERED PROPERTIES REMAIN
    setSearchPerformed(true); //SEARCH IS CALLED
  }, []);

  //HANDLING SEARCH
  const handleSearch = (filters) => {
    setInitialFilters(filters); //STORES THE FILTERED PROPERTIES
    performSearch(allProperties, filters); //SEARCHES USING THE FILTERS
  };

  //LOADING WHEN SEARCHING
  if (allProperties.length === 0) { //IF NO PROPERTIES LOADED
    return (
      <>
        <Header />
        <div className="search-page-container">
          <div className="search-left">
            <Filter onSearch={handleSearch} />
            <p>
              Loading properties...
            </p>
          </div>
          <FavouriteProperties />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="search-page-container">
        {/* LEFT COLUMN */}
        <div className="search-left">
          {/* ALWAYS SHOW FILTERS */}
          <Filter onSearch={handleSearch} initialFilters={initialFilters} />

          {/* SHOW PROPERTIES ON INITIAL LOAD */}
          {filteredProperties.length > 0 ? ( //IF THERE ARE FILTERED PROPERTIES
            <Properties
              properties={filteredProperties}
              onFavourite={addFavourite}
              onRemoveFavourite={removeFavourite}
              favouriteProperties={favourites}
            />
          ) : searchPerformed ? ( //ELSE (IF THERE ARE NO FILTERED PROPERTIES)
            <p>
              No properties found. Adjust your filters and click Search.
            </p>
          ) : (
            <Properties
              properties={allProperties} //SHOW ALL PROPERTIES INITIALLY
              onFavourite={addFavourite}
              onRemoveFavourite={removeFavourite}
              favouriteProperties={favourites}
            />
          )}
        </div>

        {/* RIGHT COLUMN */}
        <FavouriteProperties />
      </div>
      <Footer />
    </>
  );
}

export default Search;