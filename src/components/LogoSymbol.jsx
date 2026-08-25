export default function LogoSymbol({ id = 'grad', size = 120 }) {
  const gradId = `logoGrad_${id}`;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b5cff" />
          <stop offset="100%" stopColor="#b46fff" />
        </linearGradient>
      </defs>
      <path
        d="M24 25 L52 25 C57 47 75 31 72 58 C70 71 58 81 40 86 L56 106"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="76" r="6" fill="#70e6ff" />
      <circle cx="68" cy="36" r="6" fill="#fff" />
    </svg>
  );
}
