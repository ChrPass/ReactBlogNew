import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  );
};

export const MyImage = (props) => {
  return <img {...props} style={{ maxWidth: "50vw" }} />;
};
