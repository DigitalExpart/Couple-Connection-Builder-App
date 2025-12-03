interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 48 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MyMatchIQ Logo"
    >
      {/* Two overlapping hearts representing connection */}
      <path
        d="M30 35C30 25 20 20 15 25C10 30 10 40 20 50L35 65L50 50C60 40 60 30 55 25C50 20 40 25 40 35"
        fill="#FF6B9D"
        opacity="0.9"
      />
      <path
        d="M50 35C50 25 60 20 65 25C70 30 70 40 60 50L45 65L30 50C20 40 20 30 25 25C30 20 40 25 40 35"
        fill="#FF1744"
        opacity="0.9"
      />
      {/* Connecting spark/star in the middle */}
      <circle cx="40" cy="40" r="8" fill="#FFF" />
      <circle cx="40" cy="40" r="5" fill="#FF6B9D" />
    </svg>
  );
}