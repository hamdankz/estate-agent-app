import PropertyCard from "./PropertyCard"; //IMPORT PROPERTY CARD

function Properties({ properties = [] }) { // Remove other props - PropertyCard uses context
  
  if (properties.length === 0) { //IF NO PROPERTIES FOUND
    return <div className="section">No properties match your filters.</div>; //DISPLAY A MESSAGE
  } 

  return (
    <div className="section">
      <div className="section-header">
        <h2>Properties ({properties.length})</h2> {/* DISPLAY HOW MANY PROPERTIES THERE ARE */}
      </div>

      <div className="properties-grid">
        {properties.map((property) => ( //MAP GOES THROUGH EACH PROPERTY IN PROPERTY ARRAY
          <PropertyCard //USES PROPERTY CARD TO DISPLAY EACH INDIVIDUAL PROPERTY
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