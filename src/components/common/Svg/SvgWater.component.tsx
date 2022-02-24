type TProps = {
  width?: number;
  heigth?: number;
};

const SvgWater = ({ width = 20, heigth = 20 }: TProps): JSX.Element => (
  <svg
    width={width}
    height={heigth}
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 13.3334C6.93913 13.3334 5.92172 12.912 5.17157 12.1618C4.42143 11.4117 4 10.3943 4 9.33341C4 6.66675 8 2.16675 8 2.16675C8 2.16675 12 6.66675 12 9.33341C12 10.3943 11.5786 11.4117 10.8284 12.1618C10.0783 12.912 9.06087 13.3334 8 13.3334Z"
      fill="#F44336"
    />
  </svg>
);

export default SvgWater;
