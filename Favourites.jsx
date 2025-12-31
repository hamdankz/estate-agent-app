import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PropertyCard from "../Components/PropertyCard";
import { usePropertyContext } from "../Context/PropertyContext";
import { Link } from "react-router-dom";

function Favourites() {
  const { favourites, clearFavourites } = usePropertyContext();

  return (
    <>
      <Header />

      <div className="favourites-page-container">
        <h1 className="favourites-title">Your Favourite Properties</h1>
        
        {/* IF THERE ARE FAVOURITES IN THE LIST */}
        {favourites.length > 0 && (
          <div className="favourites-controls">
            <button 
              className="clear-all-btn"  //BUTTON TO CLEAR THE FAVOURITE LIST
              onClick={clearFavourites}
            >
              Clear All Favourites ({favourites.length}) {/* DISPLAYS NUMBER OF FAVOURITES IN THE LIST */}
            </button>
          </div>
        )}

        {/**/}
        <div className="favourites-grid">
          {favourites.length === 0 ? ( //IF FAVOURITE LIST IS EMPTY:
            <div className="no-favourites">
              <p>You haven't saved any favourite properties yet.</p>
              <p>Browse properties and click the "Add to Favourite" button to save them here.</p>
              <br />
              <Link to="/search" className="heroButton">Return to Search Page</Link>
            </div>
          ) : ( //ELSE, MAP THROUGH EACH PROPERTY IN THE LIST
            favourites.map((property) => {
          
              if (!property) return null; //SKIP NULL DATA
              
              return ( //DISPLAY THE PROPERTY THROUGH ITS PROPERTY CARD
                <PropertyCard
                  key={property.id}
                  property={property}
                  showRemove={true}
                />
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Favourites;