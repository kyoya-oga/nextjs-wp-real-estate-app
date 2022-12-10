import { gql } from "@apollo/client";
import client from "client";
import PAGE_SIZE from "utils/constants";

export default async function handler(req, res) {
  try {
    const filters = JSON.parse(req.body);

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `{
        key: "has_parking",
        compare: EQUAL_TO,
        value: "1"
      }`;
    }
    if (filters.petFriendly) {
      petFriendlyFilter = `{
        key: "pet_friendly",
        compare: EQUAL_TO,
        value: "1"
      }`;
    }

    if (filters.minPrice) {
      minPriceFilter = `{
        key: "price",
        compare: GREATER_THAN_OR_EQUAL_TO,
        value: "${filters.minPrice}",
        type: NUMERIC
      }`;
    }

    if (filters.maxPrice) {
      maxPriceFilter = `{
        key: "price",
        compare: LESS_THAN_OR_EQUAL_TO,
        value: "${filters.maxPrice}",
        type: NUMERIC
      }`;
    }

    const commonPageSize = PAGE_SIZE || 3;
    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery($pageSize: Int!, $offset: Int!) {
          properties(
            where: {
            offsetPagination: { size: $pageSize, offset: $offset },
            metaQuery: { relation: AND, metaArray: [
              ${hasParkingFilter},
              ${petFriendlyFilter},
              ${minPriceFilter},
              ${maxPriceFilter}
            ] }
          }) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
              databaseId
              title
              uri
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `,
      variables: {
        pageSize: commonPageSize,
        offset: ((filters.page || 1) - 1) * commonPageSize || 0,
      },
    });

    return res.status(200).json({
      properties: data.properties.nodes,
      total: data.properties.pageInfo.offsetPagination.total,
    });
  } catch (error) {
    console.error(error);
  }
}
