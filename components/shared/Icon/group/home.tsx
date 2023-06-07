export default function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.1888 26.1888V11.0755L13.5944 1L1 11.0755V26.1888H8.55665V14.8539H18.6322V26.1888H26.1888Z"
        fill={active ? "#2F88FF" : ""}
        stroke="white"
        strokeLinejoin="round"
      />
      <path
        d="M13.5942 26.1888V19.8915"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
