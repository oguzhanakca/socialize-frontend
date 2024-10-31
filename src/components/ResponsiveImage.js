import React from 'react';

const ResponsiveImage = ({ webpSrc, orgSrc, alt, style }) => {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={orgSrc} alt={alt} style={style} />
    </picture>
  );
};

export default ResponsiveImage;