import { useState } from "react";

function Filter({ onSearch }) {
  const [type, setType] = useState("");
  const [postcode, setPostcode] = useState("");

  // SLIDERS (prices)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500000);

  // SLIDERS (bedrooms)
  const [minBeds, setMinBeds] = useState(0);
  const [maxBeds, setMaxBeds] = useState(6);

  // DATE PICKER
  const [dateAdded, setDateAdded] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      type,
      postcode,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      dateAdded,
    });
  };

  const resetFilters = () => {
    setType("");
    setPostcode("");
    setMinPrice(0);
    setMaxPrice(1500000);
    setMinBeds(0);
    setMaxBeds(6);
    setDateAdded("");

    onSearch({});
  };

  return (
    <section className="filterSection">
      <h2 className="filterTitle">Search Properties</h2>

      <form className="filterForm" onSubmit={handleSubmit}>

        {/* PROPERTY TYPE */}
        <div className="filterGroup">
          <label>Property Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
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
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

{/* PRICE SLIDER */}
<div className="filterGroup sliderGroup">
  <label>
    Price Range (£{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()})
  </label>

  {/* MIN PRICE */}
  <input
    type="range"
    min="0"
    max="1500000"
    step="50000"
    value={minPrice}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value <= maxPrice) setMinPrice(value); // Prevent crossing
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
      if (value >= minPrice) setMaxPrice(value); // Prevent crossing
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
      if (value <= maxBeds) setMinBeds(value);
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
      if (value >= minBeds) setMaxBeds(value);
    }}
  />
</div>


        {/* DATE PICKER */}
        <div className="filterGroup">
          <label>Date Added</label>
          <input
            type="date"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div className="filterButtonWrapper">
          <button className="filterButton" type="submit">Search</button>
          <button type="button" className="resetButton" onClick={resetFilters}>
            Reset
          </button>
        </div>

      </form>
    </section>
  );
}

export default Filter;
