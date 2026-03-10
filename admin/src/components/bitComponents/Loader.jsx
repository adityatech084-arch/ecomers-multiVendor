import React from 'react';
import { ColorRing } from 'react-loader-spinner';

function Loader({ size = 25, color = "#fff" }) {
  return (
    <ColorRing
      visible={true}
      height={size}
      width={size}
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={[color, color, color, color, color]} // single color applied to all
    />
  );
}

export default Loader;