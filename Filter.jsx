import { useState } from "react";

function Filter({ onSearch }) {
  const priceOptions = [50000, 100000, 150000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
  const bedroomOptions = [0, 1, 2, 3, 4, 5, 6];

  const [type, setType] = useState("");
  const [postcode, setPostcode] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [dateAdded, setDateAdded] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, postcode, minPrice, maxPrice, minBeds, maxBeds, dateAdded });
  };

  const resetFilters = () => {
    setType("");
    setPostcode("");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setMaxBeds("");
    setDateAdded("");

    onSearch({}); // clears results
  };

  return (
    <section className="filterSection">
      <h2 className="filterTitle">Search Properties</h2>
      <form className="filterForm" onSubmit={handleSubmit}>
        
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
            placeholder="Any"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

        <div className="filterGroup">
          <label>Minimum Price</label>
          <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
            <option value="">Any</option>
            {priceOptions.map((p) => <option key={p} value={p}>{p.toLocaleString()}</option>)}
          </select>
        </div>

        <div className="filterGroup">
          <label>Maximum Price</label>
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="">Any</option>
            {priceOptions
              .filter((p) => minPrice === "" || p >= Number(minPrice))
              .map((p) => <option key={p} value={p}>{p.toLocaleString()}</option>)}
          </select>
        </div>

        <div className="filterGroup">
          <label>Minimum Bedrooms</label>
          <select value={minBeds} onChange={(e) => setMinBeds(e.target.value)}>
            <option value="">Any</option>
            {bedroomOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div className="filterGroup">
          <label>Maximum Bedrooms</label>
          <select value={maxBeds} onChange={(e) => setMaxBeds(e.target.value)}>
            <option value="">Any</option>
            {bedroomOptions
              .filter((b) => minBeds === "" || b >= Number(minBeds))
              .map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div className="filterGroup">
          <label>Date Added</label>
          <input type="date" value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} />
        </div>

        <div className="filterButtonWrapper">
          <button className="filterButton" type="submit">Search</button>

          {/* RESET BUTTON */}
          <button
            type="button"
            className="resetButton"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default Filter;
