import PropertyCard from "./PropertyCard";

function Properties({ properties = [], onFavourite, onRemoveFavourite, favouriteProperties = [] }) {

  if (properties.length === 0) {
    return <div className="section">No properties match your filters.</div>;
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>Properties ({properties.length})</h2>
      </div>

      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onFavourite={onFavourite}
            onRemoveFavourite={onRemoveFavourite}
            isFavourited={favouriteProperties.some((f) => f.id === property.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Properties;
