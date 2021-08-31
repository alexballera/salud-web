import * as React from 'react';

type Props = {
  title?: string;
  className?: string;
  height?: number;
  width?: number;
  minX?: string;
  minY?: string;
  viewBoxbWidth?: string;
  viewBoxbHeight?: string;
  children: React.ReactElement;
};

const SvgContainer = (props: Props): JSX.Element => {
  const { title, className, width, height, minX, minY, viewBoxbWidth, viewBoxbHeight, children } =
    props;
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={`${minX} ${minY} ${viewBoxbWidth || width} ${viewBoxbHeight || height}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
};

SvgContainer.defaultProps = {
  title: 'Svg Icon',
  className: '',
  width: 40,
  height: 30,
  minX: '0',
  minY: '0'
};

export default SvgContainer;
