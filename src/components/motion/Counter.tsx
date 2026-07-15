interface CounterProps {
  value: number;
  decimals?: number;
  className?: string;
}

/** A server-rendered stat value that stays available without client JavaScript. */
export function Counter({ value, decimals = 0, className }: CounterProps) {
  const text = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span className={className}>{text}</span>;
}
