import React from "react";
import PropertyCard from "./PropertyCard/PropertyCard";

export default function Results({ properties }) {
  return (
    <ul className="max-w-5xl mx-auto grid auto-rows-[minmax(300px,_1fr)] grid-cols-2 md:grid-cols-3 gap-5 mb-10">
      {properties.map((property) => {
        return (
          <PropertyCard
            key={property.databaseId}
            title={property.title}
            destination={property.uri}
            bathrooms={property.propertyFeatures.bathrooms}
            bedrooms={property.propertyFeatures.bedrooms}
            price={property.propertyFeatures.price}
            hasParking={property.propertyFeatures.hasParking}
            petFriendly={property.propertyFeatures.petFriendly}
            image={property.featuredImage.node.sourceUrl}
          />
        );
      })}
    </ul>
  );
}
