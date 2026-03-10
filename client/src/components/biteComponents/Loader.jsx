import React from 'react';
import { ColorRing } from 'react-loader-spinner';

function Loader({ size = 25, color = "#fff" ,width ,height ,bgColor}) {
  return (
    <div className={`w-[${width || ""}%] h-[${height || ""}vh] bg-${bgColor} flex items-center justify-center`}>
    <ColorRing
      visible={true}
      height={size}
      width={size}
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={[color, color, color, color, color]} // single color applied to all
    />
    </div>
  );
}

export default Loader;





