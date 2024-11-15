// custom hook lấy thông tin về kích thước của viewporrt

import React, { useEffect, useState } from "react";

const useViewPort = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

export default useViewPort;
