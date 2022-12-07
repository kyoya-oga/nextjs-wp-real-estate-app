import { gql } from "@apollo/client";
import client from "client";
import BlockRenderer from "components/BlockRenderer/BlockRenderer";
import React from "react";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export default function Page(props) {
  console.log(props);
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
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
export const getStaticProps = async ({ params }) => {
  const uri = `/${params.slug.join("/")}/`;
  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocksJSON
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON);
  return {
    props: {
      title: data.nodeByUri.title,
      blocks,
    },
  };
};
