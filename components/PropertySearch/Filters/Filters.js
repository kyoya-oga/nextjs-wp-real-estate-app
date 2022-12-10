import Input from "components/Input/Input";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

export default function Filters({ onSearch }) {
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice,
    });
  };

  useEffect(() => {
    const {
      petFriendly: petFriendlyQuery,
      hasParking: hasParkingQuery,
      minPrice: minPriceQuery,
      maxPrice: maxPriceQuery,
    } = queryString.parse(window.location.search);
    setPetFriendly(petFriendlyQuery === "true");
    setHasParking(hasParkingQuery === "true");
    setMinPrice(Number(minPriceQuery) || 0);
    setMaxPrice(Number(maxPriceQuery) || 0);
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-5 flex items-center gap-5 border border-solid border-slate-400 p-5 rounded-md">
      <ul className="flex-1 space-y-1">
        <li>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={() => setHasParking((value) => !value)}
            />
            <span className="pl-2">has parking</span>
          </label>
        </li>
        <li>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={() => setPetFriendly((value) => !value)}
            />
            <span className="pl-2">pet friendly</span>
          </label>
        </li>
      </ul>
      <div className="flex-1">
        <label htmlFor="minPrice">Min price</label>
        <Input
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          min={0}
          type="number"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="maxPrice">Max price</label>
        <Input
          id="maxPrice"
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>
    </div>
  );
}
