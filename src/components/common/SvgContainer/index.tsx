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
  svg: React.ReactElement;
};

const SvgContainer = (props: Props): JSX.Element => {
  const { title, className, width, height, minX, minY, viewBoxbWidth, viewBoxbHeight, svg } = props;
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={`${minX} ${minY} ${viewBoxbWidth} ${viewBoxbHeight}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>{title}</title>
      {svg}
      {/* <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group-3" transform="translate(0.000000, -0.000000)">
          <g id="Group-2" fill="#DAF0F0">
            <path
              d="M22.0570126,3.27682764 C18.6776235,3.6463166 13.8779759,7.23619865 9.25731453,6.25969033 C4.6366532,5.283182 0.459871964,9.12648862 2.52623522,16.3239235 C4.59259847,23.5213584 19.1296012,23.5170521 23.7462444,19.1712394 C28.3628877,14.8254266 30.0174696,10.7506775 29.0715986,7.48258915 C28.1257277,4.21450079 25.4364017,2.90733867 22.0570126,3.27682764 Z"
              id="Path-2"
              transform="translate(15.655451, 12.679381) rotate(-165.000000) translate(-15.655451, -12.679381) "
            ></path>
          </g>
          <text
            id="OS"
            fontFamily="Poppins-Bold, Poppins"
            fontSize="21.4285714"
            fontWeight="bold"
            line-spacing="22.8571429"
            letterSpacing="1.23214287"
          >
            <tspan x="7.14063356" y="30.0599081" fill="#84BEBE">
              O
            </tspan>
            <tspan x="25.2799193" y="30.0599081" fill="#0097A7">
              S
            </tspan>
          </text>
        </g>
      </g> */}
    </svg>
  );
};

SvgContainer.defaultProps = {
  title: 'Svg Icon',
  className: '',
  width: 40,
  height: 30,
  minX: '0',
  minY: '0',
  viewBoxbWidth: '40',
  viewBoxbHeight: '30'
};

export default SvgContainer;
