type TProps = {
  width?: number;
  heigth?: number;
};

const SvgDiseases = ({ width = 30, heigth = 30 }: TProps): JSX.Element => (
  <svg
    width={width}
    height={heigth}
    fill="none"
    viewBox={`0 0 ${width} ${heigth}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.7988 0H7.20116C3.22407 0 0 3.22407 0 7.20116V22.7988C0 26.7759 3.22407 30 7.20116 30H22.7988C26.7759 30 30 26.7759 30 22.7988V7.20116C30 3.22407 26.7759 0 22.7988 0Z"
      fill="#FBFBFB"
    />
    <path
      d="M15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25Z"
      fill="#29CBD3"
    />
    <path d="M17.0836 9.69727H12.6504V20.305H17.0836V9.69727Z" fill="#D9FCFC" />
    <path d="M20.2545 12.7041H9.48828V17.2957H20.2545V12.7041Z" fill="#D9FCFC" />
  </svg>
);

export default SvgDiseases;
