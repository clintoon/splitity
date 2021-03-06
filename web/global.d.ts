// For react-svg-loader
declare module '*.svg' {
  import React from 'react';

  interface SVGProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    fill?: string;
    viewBox?: string;
  }

  const svg: React.FunctionComponent<SVGProps>;
  export default svg;
}

// For file loader
declare module '*.png' {
  const content: string;
  export default content;
}

// For raw loader
declare module '*.md' {
  const content: string;
  export default content;
}
