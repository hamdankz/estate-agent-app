import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Favourites({
  favouriteProperties = [],
  removeFavourite = () => {},
  clearFavourites = () => {}
}) {
  return (
    <>
      <Header />

      <div className="favPage-container">
        <h1 className="favPage-title">Your Favourite Properties</h1>

        {/* Favourite properties list */}
        <div className="favPage-list">
          {favouriteProperties.length === 0 ? (
            <p className="favPage-empty">No favourite properties yet.</p>
          ) : (
            favouriteProperties.map((p) => (
              <div className="favPage-card" key={p.id}>
                <img className="favPage-img" src={p.picture} alt={p.type} />
                <div className="favPage-info">
                  <h3>{p.type} — £{p.price.toLocaleString()}</h3>
                  <p>{p.location}</p>
                </div>
                <button
                  className="favPage-removeBtn"
                  onClick={() => removeFavourite(p)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>


        {/* Clear All button below the list */}
        {favouriteProperties.length > 0 && (
          <div className="favPage-controls">
            <button className="ClearBtn" onClick={clearFavourites}>
              Clear All
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Favourites;
