import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PropertyCard from "../Components/PropertyCard"; // Import PropertyCard
import { usePropertyContext } from "../Context/PropertyContext";

function Favourites() {
  const { favourites, removeFavourite, clearFavourites } = usePropertyContext();

  return (
    <>
      <Header />

      <div className="favourites-page-container">
        <h1 className="favourites-title">Your Favourite Properties</h1>
        
        {/* Show Clear All button only if there are favorites */}
        {favourites.length > 0 && (
          <div className="favourites-controls">
            <button 
              className="clear-all-btn" 
              onClick={clearFavourites}
            >
              Clear All Favourites
            </button>
            <p className="favourites-count">
              {favourites.length} {favourites.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
        )}

        {/* Display favorites using PropertyCard component */}
        <div className="favourites-grid">
          {favourites.length === 0 ? (
            <div className="no-favourites">
              <p>You haven't saved any favourite properties yet.</p>
              <p>Browse properties and click the "Add to Favourite" button to save them here.</p>
            </div>
          ) : (
            favourites.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showRemove={true} // Show remove button instead of add button
                // PropertyCard already uses removeFavourite from context
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Favourites;