import React from "react";

const translateComponent = (ComponentToTranslate, translations) => {
  return (props = {}) => {
    const dir = props.lang === "he" ? "rtl" : "ltr";
    window.document.body.setAttribute("dir", dir);
    return (
      <ComponentToTranslate {...props} translated={translations[props.lang]} />
    );
  };
};

export default translateComponent;
