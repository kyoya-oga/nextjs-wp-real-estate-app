import Heading from "components/Heading/Heading";
import { usePageContext } from "context/page";
import React from "react";

export default function PostTitle({ level, textAlign }) {
  const { title } = usePageContext();
  return <Heading content={title} level={level} textAlign={textAlign} />;
}
