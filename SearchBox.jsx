function SearchBox({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      className="searchBox"
      placeholder="Search property by type or location..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBox;
