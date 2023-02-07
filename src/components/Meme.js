import React from "react";

export const Meme = ({ template, onClick }) => {
  return (
    <img
      style={{ width: 150 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
  );
};