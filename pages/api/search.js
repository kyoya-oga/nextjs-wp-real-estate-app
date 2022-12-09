import { gql } from "@apollo/client";
import client from "client";
import PAGE_SIZE from "utils/constants";

export default async function handler(req, res) {
  try {
    const filters = JSON.parse(req.body);
    const commonPageSize = PAGE_SIZE || 3;
    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery($pageSize: Int!, $offset: Int!) {
          properties(
            where: { offsetPagination: { size: $pageSize, offset: $offset } }
          ) {
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
