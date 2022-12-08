import BlockRenderer from "components/BlockRenderer/BlockRenderer";
import MainMenu from "components/MainMenu/MainMenu";
import PageTemplate from "components/PageTemplate/PageTemplate";
import { getPageStaticProps } from "utils/getPageStaticProps";

export default function Home({ blocks, mainMenuItems, callToActionButton }) {
  // console.log(callToActionButton);
  return (
    <PageTemplate
      blocks={blocks}
      mainMenuItems={mainMenuItems}
      callToActionButton={callToActionButton}
    />
  );
}

export const getStaticProps = getPageStaticProps;
