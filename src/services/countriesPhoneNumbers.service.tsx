import SvgContainer from '../components/common/SvgContainer';

const PHONE_LIST = [
  {
    validation: /^([0-9]){8,8}$/,
    value: 'crc',
    countryCode: '506',
    mask: ['+', '5', '0', '6', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    flag: (
      <SvgContainer width={28} height={20}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x={0.25}
            y={0.25}
            width={27.5}
            height={19.5}
            rx={1.75}
            fill="#fff"
            stroke="#F5F5F5"
            strokeWidth={0.5}
          />
          <mask
            id="a"
            style={{
              maskType: 'alpha'
            }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={28}
            height={20}
          >
            <rect
              x={0.25}
              y={0.25}
              width={27.5}
              height={19.5}
              rx={1.75}
              fill="#fff"
              stroke="#fff"
              strokeWidth={0.5}
            />
          </mask>
          <g mask="url(#a)" fillRule="evenodd" clipRule="evenodd">
            <path d="M0 4h28V0H0v4ZM0 20h28v-4H0v4Z" fill="#06358F" />
            <path d="M0 13.333h28V6.667H0v6.666Z" fill="#E61F37" />
          </g>
        </svg>
      </SvgContainer>
    )
  },
  {
    validation: /^([0-9]){10,10}$/,
    value: 'mx',
    countryCode: '52',
    mask: [
      '+',
      '5',
      '2',
      ' ',
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ],
    flag: (
      <SvgContainer width={28} height={20}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x={0.25}
            y={0.25}
            width={27.5}
            height={19.5}
            rx={1.75}
            fill="#fff"
            stroke="#F5F5F5"
            strokeWidth={0.5}
          />
          <mask
            id="a"
            style={{
              maskType: 'alpha'
            }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={28}
            height={20}
          >
            <rect
              x={0.25}
              y={0.25}
              width={27.5}
              height={19.5}
              rx={1.75}
              fill="#fff"
              stroke="#fff"
              strokeWidth={0.5}
            />
          </mask>
          <g mask="url(#a)">
            <path fill="#E3283E" d="M18.667 0H28v20h-9.333z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0 20h9.333V0H0v20Z" fill="#128A60" />
            <path
              d="M12 9.333a.667.667 0 0 0-1.334 0H12Zm.329 2.885a.667.667 0 0 0 .669-1.153l-.67 1.153Zm2.746-1.198a.667.667 0 0 0 .719 1.123l-.719-1.123Zm2.258-1.687a.667.667 0 0 0-1.333 0h1.333Zm-6.667 0c0 1.233.67 2.31 1.663 2.885l.669-1.153A1.999 1.999 0 0 1 12 9.333h-1.334Zm5.128 2.81a3.331 3.331 0 0 0 1.539-2.81H16c0 .708-.367 1.33-.925 1.687l.719 1.123Z"
              fill="#8C9157"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 10.667c.737 0 1.334-.896 1.334-2 0-1.105-.597-2-1.334-2-.736 0-1.333.895-1.333 2 0 1.104.597 2 1.333 2Z"
              fill="#C59262"
            />
          </g>
        </svg>
      </SvgContainer>
    )
  }
];

export default PHONE_LIST;
