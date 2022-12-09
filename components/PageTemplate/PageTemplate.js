import BlockRenderer from "components/BlockRenderer/BlockRenderer";
import MainMenu from "components/MainMenu/MainMenu";
import { PageWrapper } from "context/page";

export default function PageTemplate({
  blocks,
  mainMenuItems,
  callToActionButton,
  featuredImage,
  title,
}) {
  return (
    <PageWrapper value={{ title, featuredImage }}>
      <MainMenu callToActionButton={callToActionButton} items={mainMenuItems} />
      <BlockRenderer blocks={blocks} />
    </PageWrapper>
  );
}
