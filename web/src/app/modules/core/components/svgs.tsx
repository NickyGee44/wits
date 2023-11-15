export const MAPPING = {
  diamond: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M0.707106 5L5 0.707106L9.29289 5L5 9.29289L0.707106 5Z"
        fill="black"
        stroke="#FFFED0"
      />
    </svg>
  ),
};

interface SvgProps {
  name: keyof typeof MAPPING;
}

export function Svg({ name }: SvgProps) {
  return MAPPING[name];
}
