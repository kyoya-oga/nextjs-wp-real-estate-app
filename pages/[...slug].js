import { gql } from "@apollo/client";
import client from "client";
import PageTemplate from "components/PageTemplate/PageTemplate";
import { getPageStaticProps } from "utils/getPageStaticProps";

export default function Page({
  blocks,
  mainMenuItems,
  callToActionButton,
  featuredImage,
  title,
}) {
  return (
    <PageTemplate
      blocks={blocks}
      mainMenuItems={mainMenuItems}
      callToActionButton={callToActionButton}
      featuredImage={featuredImage}
      title={title}
    />
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
        properties {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: [...data.pages.nodes, ...data.properties.nodes].map((page) => ({
      params: {
        slug: page.uri.substring(1, page.uri.length).split("/"),
      },
    })),
    fallback: false,
  };
};
export const getStaticProps = getPageStaticProps;
