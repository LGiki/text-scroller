export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="300"
      fill="none"
      viewBox="0 0 300 300"
      {...props}
    >
      <mask
        id="a"
        width="300"
        height="300"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
        <circle cx="150" cy="50" r="50" fill="#D9D9D9" />
        <circle cx="250" cy="50" r="50" fill="#D9D9D9" />
        <circle cx="150" cy="150" r="50" fill="#D9D9D9" />
        <circle cx="150" cy="250" r="50" fill="#D9D9D9" />
        <path
          fill="#D9D9D9"
          d="M50 100A50 50 0 0 0 0 50v50h50ZM300 50a50 50 0 0 0-50 50h50V50ZM200 250a49.993 49.993 0 0 0-35.355 14.645A50.007 50.007 0 0 0 150 300h50v-50ZM150 300a49.993 49.993 0 0 0-14.645-35.355A50.007 50.007 0 0 0 100 250v50h50Z"
        />
      </mask>
      <g mask="url(#a)">
        <path fill="#fff" d="M300 0H0v300h300V0Z" />
        <path fill="#FFC700" fillOpacity=".325" d="M300 0H0v300h300V0Z" />
        <mask
          id="b"
          width="300"
          height="300"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path fill="#fff" d="M300 0H0v300h300V0Z" />
        </mask>
        <g filter="url(#c)" mask="url(#b)">
          <path
            fill="#F2371F"
            d="M220.125 132.188H18v230.437h202.125V132.188Z"
          />
          <path
            fill="#1BC47D"
            d="M334.688 123.375H97.875v156.187h236.813V123.375Z"
          />
          <path fill="#F2371F" d="M196.312 143.062h-192V303h192V143.062Z" />
          <path fill="#EE46D3" d="M313.688 78.375H139.5v222h174.188v-222Z" />
          <path
            fill="#EE46D3"
            d="M353.062 6.188h-236.25v219.374h236.25V6.187Z"
          />
          <path
            fill="#EE46D3"
            d="M303.938 61.313h-193.5v172.312h193.5V61.312Z"
          />
        </g>
        <path
          fill="gray"
          d="M300 0H0v300h300V0Z"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
      <defs>
        <filter
          id="c"
          width="848.75"
          height="856.438"
          x="-245.688"
          y="-243.812"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_3_81"
            stdDeviation="125"
          />
        </filter>
      </defs>
    </svg>
  );
}
