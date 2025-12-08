import PropertyCard from "./PropertyCard";

function Properties({ properties = [] }) { // Remove other props - PropertyCard uses context
  
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
            // NO PROPS NEEDED - PropertyCard uses context directly
          />
        ))}
      </div>
    </div>
  );
}

export default Properties;