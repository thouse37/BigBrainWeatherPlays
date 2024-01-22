const WarmTempSVG = ({ style }) => (
  <svg className={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient
        id="a"
        x1="23.73"
        x2="39.18"
        y1="19.16"
        y2="45.93"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#515a69" stopOpacity=".05" />
        <stop offset=".45" stopColor="#6b7280" stopOpacity=".05" />
        <stop offset="1" stopColor="#384354" stopOpacity=".1" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="23.48"
        x2="39.43"
        y1="18.73"
        y2="46.36"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#d4d7dd" />
        <stop offset=".45" stopColor="#d4d7dd" />
        <stop offset="1" stopColor="#bec1c6" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="42" r="4.5" fill="#ef4444" />
    <path
      fill="none"
      stroke="#ef4444"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="3"
      d="M32 19v23"
    />
    <path
      fill="url(#a)"
      stroke="url(#b)"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M32.5 29H36m3 12.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36"
    />
    <path
      fill="none"
      stroke="#ef4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M44 38V26l-3 3.45L44 26l3 3.45"
    />
  </svg>
);

export default WarmTempSVG;
