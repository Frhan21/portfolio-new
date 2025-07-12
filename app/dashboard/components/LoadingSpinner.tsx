import { FC } from "react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 48,
  color = "currentColor",
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size, borderColor: color, borderTopColor: 'transparent' }}
      className={`animate-spin rounded-full border-4 ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;