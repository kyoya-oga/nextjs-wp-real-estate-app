import { gql } from "@apollo/client";
import client from "client";
import PageTemplate from "components/PageTemplate/PageTemplate";
import { getPageStaticProps } from "utils/getPageStaticProps";

export default function Page({ blocks, mainMenuItems, callToActionButton }) {
  return (
    <PageTemplate
      blocks={blocks}
      mainMenuItems={mainMenuItems}
      callToActionButton={callToActionButton}
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
      }
    `,
  });

  return {
    paths: data.pages.nodes.map((page) => ({
      params: {
        slug: page.uri.substring(1, page.uri.length).split("/"),
      },
    })),
    fallback: false,
  };
};
export const getStaticProps = getPageStaticProps;
