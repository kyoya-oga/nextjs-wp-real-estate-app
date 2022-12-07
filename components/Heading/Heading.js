import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

export default function Heading({ textAlign, content, level }) {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading max-w-5xl mx-auto ${getFontSizeForHeading(
      level
    )} ${getTextAlign(textAlign)}`,
  });
  return tag;
}
