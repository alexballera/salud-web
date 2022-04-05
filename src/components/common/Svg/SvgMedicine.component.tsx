type TProps = {
  width?: number;
  heigth?: number;
};

const SvgMedicine = ({ width = 32, heigth = 32 }: TProps): JSX.Element => (
  <svg
    width={width}
    height={heigth}
    viewBox={`0 0 ${width} ${heigth}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.066 16.6268C29.9864 15.7326 30.7199 14.6643 31.2238 13.4841C31.7277 12.304 31.992 11.0354 32.0012 9.75215C32.0105 8.46893 31.7646 7.19667 31.2778 6.00932C30.791 4.82198 30.073 3.74326 29.1656 2.83586C28.2582 1.92846 27.1795 1.21049 25.9922 0.723695C24.8048 0.236898 23.5326 -0.00901533 22.2493 0.000252534C20.9661 0.0095204 19.6975 0.273784 18.5174 0.77768C17.3372 1.28158 16.2689 2.01505 15.3747 2.93546L9.05566 9.25234L22.7492 22.9458L29.066 16.6268Z"
      fill="#B45EF7"
    />
    <path
      d="M9.05456 9.25195L2.73768 15.571C0.965209 17.3955 -0.0181179 19.8441 0.000252847 22.3877C0.0186235 24.9313 1.03722 27.3655 2.83586 29.1642C4.6345 30.9628 7.0687 31.9814 9.6123 31.9998C12.1559 32.0181 14.6046 31.0348 16.429 29.2623L22.7481 22.9455L9.05456 9.25195Z"
      fill="#D1A9FF"
    />
    <path
      d="M24.6584 14.2052C24.3219 13.8681 24.133 13.4114 24.133 12.9352C24.133 12.459 24.3219 12.0023 24.6584 11.6653C24.9228 11.4009 25.1326 11.0871 25.2758 10.7416C25.4189 10.3962 25.4926 10.0259 25.4926 9.65197C25.4926 9.27803 25.4189 8.90776 25.2758 8.56231C25.1326 8.21686 24.9228 7.90301 24.6584 7.63867C24.4916 7.4719 24.3593 7.27391 24.269 7.05601C24.1788 6.83812 24.1323 6.60458 24.1323 6.36873C24.1323 6.13288 24.1788 5.89933 24.269 5.68144C24.3593 5.46354 24.4916 5.26555 24.6584 5.09878C24.8251 4.93201 25.0231 4.79972 25.241 4.70946C25.4589 4.61921 25.6924 4.57275 25.9283 4.57275C26.1641 4.57275 26.3977 4.61921 26.6156 4.70946C26.8335 4.79972 27.0315 4.93201 27.1982 5.09878C28.4041 6.30726 29.0814 7.94475 29.0814 9.65197C29.0814 11.3592 28.4041 12.9967 27.1982 14.2052C26.8612 14.5416 26.4045 14.7305 25.9283 14.7305C25.4521 14.7305 24.9954 14.5416 24.6584 14.2052V14.2052Z"
      fill="#EDDDFF"
    />
  </svg>
);

export default SvgMedicine;
