import CallToActionButton from "components/CallToActionButton/CallToActionButton";
import Column from "components/Column/Column";
import Columns from "components/Columns/Columns";
import Cover from "components/Cover/Cover";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import PostTitle from "components/PostTitle/PostTitle";
import PropertySearch from "components/PropertySearch/PropertySearch";
import Image from "next/image";
import { theme } from "theme";

const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination?.slug || "/"}
            align={block.attributes.data.align}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            content={block.attributes.content}
            fontSize={block.attributes.style?.typography.fontSize}
            textAlign={block.attributes.align}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }

      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }

      case "core/column": {
        return (
          <Column key={block.id} width={block.attributes.width}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }

      case "core/block":
      case "core/group": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }

      case "core/post-title": {
        return (
          <PostTitle
            key={block.id}
            textAlign={block.attributes.textAlign}
            level={block.attributes.level}
          />
        );
      }

      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />;
      }

      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            width={block.attributes.width}
            height={block.attributes.height}
            alt={block.attributes.alt}
          />
        );
      }

      default: {
        console.log("BlockRenderer: Unknown block type", block);
        return null;
      }
    }
  });
};

export default BlockRenderer;
