import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { PAGE_SIZE } from "utils/constants";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import Results from "./Results/Results";

export default function PropertySearch() {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();

  const search = async () => {
    const { page, petFriendly, hasParking, minPrice, maxPrice } =
      queryString.parse(window.location.search);

    const filters = {};
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (petFriendly === "true") filters.petFriendly = true;
    if (hasParking === "true") filters.hasParking = true;

    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        ...filters,
      }),
    });
    const data = await response.json();
    console.log(data);
    setTotalResults(data.total);
    setProperties(data.properties);
  };

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=${pageNumber}&petFriendly=${petFriendly}&hasParking=${hasParking}&minPrice=${Number(
        minPrice
      )}&maxPrice=${Number(maxPrice)}`
    ),
      null,
      {
        shallow: true,
      };
    search();
  };

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    await router.push(
      `${router.query.slug.join("/")}?page=1&petFriendly=${
        petFriendly === "true"
      }&hasParking=${hasParking === "true"}&minPrice=${Number(
        minPrice
      )}&maxPrice=${Number(maxPrice)}`
    ),
      null,
      {
        shallow: true,
      };
    search();
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / PAGE_SIZE)}
      />
    </div>
  );
}
