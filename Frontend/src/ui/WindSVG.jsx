const WindSVG = ({ style }) => (
  <svg
    className={style}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="a"
        x1="27.56"
        x2="38.27"
        y1="17.64"
        y2="36.19"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#d4d7dd" />
        <stop offset=".45" stopColor="#d4d7dd" />
        <stop offset="1" stopColor="#d4d7dd" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="19.96"
        x2="31.37"
        y1="29.03"
        y2="48.8"
        xlinkHref="#a"
      />
    </defs>
    <path
      fill="none"
      stroke="url(#b)"
      strokeDasharray="35 22"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="3"
      d="M43.64 20a5 5 0 113.61 8.46h-35.5"
    >
      {/* Animation for the first path */}
      <animate
        attributeName="stroke-dashoffset"
        dur="2s"
        repeatCount="indefinite"
        values="-57; 57"
      />
    </path>
    <path
      fill="none"
      stroke="url(#b)"
      strokeDasharray="24 15"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="3"
      d="M29.14 44a5 5 0 103.61-8.46h-21"
    >
      {/* Animation for the second path */}
      <animate
        attributeName="stroke-dashoffset"
        begin="-1.5s"
        dur="2s"
        repeatCount="indefinite"
        values="-39; 39"
      />
    </path>
  </svg>
);

export default WindSVG;
