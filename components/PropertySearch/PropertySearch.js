import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { PAGE_SIZE } from "utils/constants";
import Pagination from "./Pagination/Pagination";
import Results from "./Results/Results";

export default function PropertySearch() {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();

  const search = async () => {
    const { page } = queryString.parse(window.location.search);
    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
      }),
    });
    const data = await response.json();
    setTotalResults(data.total);
    setProperties(data.properties);
  };

  const handlePageClick = async (pageNumber) => {
    await router.push(`${router.query.slug.join("/")}?page=${pageNumber}`),
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
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / PAGE_SIZE)}
      />
    </div>
  );
}
