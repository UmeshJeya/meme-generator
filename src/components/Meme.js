import React from "react";

export const Meme = ({ template, onClick, onKeyDown }) => {
  return (
    <img 
      style={{ width: 300 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
      onKeyDown= {onKeyDown}
      tabindex="0"
    />
  );
};