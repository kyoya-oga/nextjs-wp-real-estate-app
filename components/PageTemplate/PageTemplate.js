import BlockRenderer from "components/BlockRenderer/BlockRenderer";
import MainMenu from "components/MainMenu/MainMenu";
import React from "react";

export default function PageTemplate({
  blocks,
  mainMenuItems,
  callToActionButton,
}) {
  return (
    <div>
      <MainMenu callToActionButton={callToActionButton} items={mainMenuItems} />
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
