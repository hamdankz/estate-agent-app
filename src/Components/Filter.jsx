import { useState } from "react";

function Filter({ onSearch }) {

  // CURRENT TYPE AND POSTCODE IS SET AS ANY (ALL IS VALID)
  const [type, setType] = useState(""); //DEFAULT IS ANY
  const [postcode, setPostcode] = useState(""); //DEFAULT IS ANY

  // SETS 'MINIMUM PRICE' AND 'MAXIMUM PRICE' VALUES
  const [minPrice, setMinPrice] = useState(0); //DEFAULT IS £0
  const [maxPrice, setMaxPrice] = useState(1500000); //DEFAULT IS £1,500,000

  // SETS 'MINIMUM BEDROOMS' AND 'MAXIMUM BEDROOMS' VALUES
  const [minBeds, setMinBeds] = useState(0); //DEFAULT IS 0
  const [maxBeds, setMaxBeds] = useState(6); //DEFAULT IS 6

  // CURRENT 'DATE ADDED' IS SET AS ANY (ALL IS VALID)
  const [dateAdded, setDateAdded] = useState(""); //DEFAULT IS ANY

  const handleSubmit = (e) => { //WHEN SUBMIT IS CLICKED
    e.preventDefault(); //PREVENT BROWSER DEFAULTS
    onSearch({ //SEARCH USING THE SET VALUES FROM FILTERS
      type,
      postcode,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      dateAdded,
    });
  };

  const resetFilters = () => { //WHEN RESET IS CLICKED, SET ALL VALUES TO DEFAULT
    setType("");
    setPostcode("");
    setMinPrice(0);
    setMaxPrice(1500000);
    setMinBeds(0);
    setMaxBeds(6);
    setDateAdded("");

    onSearch({}); //SEARCH
  };

  return (
    <section className="filterSection">
      <h2 className="filterTitle">Search Properties</h2>

      <form className="filterForm" onSubmit={handleSubmit}> 

        {/* PROPERTY TYPE */}
        <div className="filterGroup">
  <label htmlFor="propertyType">Property Type</label>
  <select
    id="propertyType"
    data-testid="property-type"
    value={type}
    onChange={(e) => setType(e.target.value)}
  >
    <option value="">Any</option> 
    <option value="House">House</option>
    <option value="Flat">Flat</option>
  </select>
</div>


        {/* POSTCODE */}
        <div className="filterGroup">
          <label>Postcode Area</label>
          <input
            type="text"
            placeholder="BR5, SE20, etc."
            data-testid="postcode-input"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

{/* PRICE SLIDER */}
<div className="filterGroup sliderGroup">
  <label>
    Price Range (£{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()}) {/* TOLOCALESTRING FOR COMMAS*/}
  </label>

  {/* MIN PRICE */}
  <input
    type="range"
    min="0" 
    max="1500000"
    step="50000"
    className="minPrice"
    data-testid="minPrice"
    value={minPrice}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value <= maxPrice) setMinPrice(value); //PREVENT MINIMUM PRICE BEING ABOVE THE MAXIMUM PRICE
    }}
  />

  {/* MAX PRICE */}
  <input
    type="range"
    min="0"
    max="1500000"
    step="50000"
    value={maxPrice}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value >= minPrice) setMaxPrice(value); //PREVENT MAXIMUM PRICE BEING BELOW THE MINIMUM PRICE
    }}
  />
</div>


{/* BEDROOM SLIDER */}
<div className="filterGroup sliderGroup">
  <label>Bedrooms ({minBeds} - {maxBeds})</label>

  {/* MIN BEDS */}
  <input
    type="range"
    min="0"
    max="6"
    value={minBeds}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value <= maxBeds) setMinBeds(value); //PREVENT MAXIMUM BEDROOMS BEING BELOW THE MINIMUM BEDROOMS
    }}
  />

  {/* MAX BEDS */}
  <input
    type="range"
    min="0"
    max="6"
    value={maxBeds}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value >= minBeds) setMaxBeds(value); //PREVENT MAXIMUM BEDROOMS BEING BELOW THE MINIMUM BEDROOMS
    }}
  />
</div>


<div className="filterGroup">
  <label htmlFor="dateAdded">Date Added</label>
  <input
    type="date"
    id="dateAdded"
    data-testid="date-added"
    value={dateAdded}
    onChange={(e) => setDateAdded(e.target.value)}
  />
</div>


        {/* BUTTONS */}
        <div className="filterButtonWrapper">
          <button className="filterButton" type="submit" data-testid="search-button">Search</button>


          <button type="button" className="resetButton" onClick={resetFilters} data-testid="reset-button">
            
            Reset
          </button>
        </div>

      </form>
    </section>
  );
}

export default Filter;
