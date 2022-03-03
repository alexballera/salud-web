type TProps = {
  width?: number;
  heigth?: number;
};

const SvgVaccines = ({ width = 30, heigth = 30 }: TProps): JSX.Element => (
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
      d="M20.946 10.3825L23.4189 7.90961C23.788 7.54046 23.7883 6.94219 23.4194 6.57333C23.0505 6.20447 22.4523 6.2047 22.0831 6.57384L19.6103 9.04672C19.2411 9.41587 19.2409 10.0141 19.6097 10.383C19.9786 10.7519 20.5769 10.7516 20.946 10.3825Z"
      fill="#B45EF7"
    />
    <path
      d="M25.3289 8.25355L21.7437 4.6684C21.3746 4.29925 20.7763 4.29902 20.4074 4.66788C20.0386 5.03675 20.0388 5.63502 20.408 6.00417L23.9931 9.58932C24.3622 9.95847 24.9605 9.9587 25.3294 9.58984C25.6982 9.22097 25.698 8.6227 25.3289 8.25355Z"
      fill="#B45EF7"
    />
    <path
      d="M12.5047 23.5427L8.07107 23.3481C7.69693 23.3313 7.34261 23.1751 7.07779 22.9103C6.81297 22.6455 6.6568 22.2911 6.64001 21.917L6.44686 17.4848C6.43779 17.2773 6.47215 17.0701 6.54774 16.8766C6.62333 16.6831 6.73848 16.5075 6.88583 16.361L15.5702 7.67664C15.8091 7.43737 16.0929 7.24756 16.4052 7.11805C16.7176 6.98854 17.0524 6.92188 17.3905 6.92188C17.7286 6.92188 18.0634 6.98854 18.3758 7.11805C18.6881 7.24756 18.9719 7.43737 19.2108 7.67664L22.3129 10.786C22.5521 11.025 22.742 11.3087 22.8715 11.6211C23.001 11.9334 23.0676 12.2682 23.0676 12.6063C23.0676 12.9445 23.001 13.2793 22.8715 13.5916C22.742 13.904 22.5521 14.1877 22.3129 14.4266L13.6314 23.1052C13.4845 23.2526 13.3084 23.3677 13.1143 23.4431C12.9203 23.5184 12.7126 23.5523 12.5047 23.5427Z"
      fill="#C385FF"
    />
    <path
      d="M12.723 10.5293L15.3025 13.1087C15.3745 13.1808 15.4316 13.2662 15.4706 13.3603C15.5096 13.4544 15.5296 13.5553 15.5296 13.6571C15.5296 13.759 15.5096 13.8598 15.4706 13.9539C15.4316 14.048 15.3745 14.1335 15.3025 14.2055C15.157 14.3509 14.9598 14.4326 14.7541 14.4326C14.5484 14.4326 14.3512 14.3509 14.2057 14.2055L11.6263 11.6261L12.723 10.5293Z"
      fill="#EDDDFF"
    />
    <path
      d="M5.64511 25.452L7.67721 23.42C7.98007 23.1171 7.98007 22.6261 7.67721 22.3232C7.37435 22.0204 6.88331 22.0204 6.58045 22.3232L4.54835 24.3553C4.24549 24.6581 4.24549 25.1492 4.54835 25.452C4.85121 25.7549 5.34225 25.7549 5.64511 25.452Z"
      fill="#D1A9FF"
    />
    <path
      d="M10.3208 12.9233L12.9013 15.5038C13.0467 15.6492 13.1284 15.8465 13.1284 16.0522C13.1284 16.2579 13.0467 16.4551 12.9013 16.6006C12.8293 16.6726 12.7438 16.7297 12.6497 16.7687C12.5556 16.8076 12.4547 16.8277 12.3529 16.8277C12.2511 16.8277 12.1502 16.8076 12.0561 16.7687C11.962 16.7297 11.8765 16.6726 11.8045 16.6006L9.22405 14.0201L10.3208 12.9233Z"
      fill="#EDDDFF"
    />
  </svg>
);

export default SvgVaccines;