import React from "react";
import "react-quill/dist/quill.snow.css";

const ContentBlog = ({ content }) => {
  content = JSON.parse(content);
  return (
    <div
      className="ql-editor"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default ContentBlog;
