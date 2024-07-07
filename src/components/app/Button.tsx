export default function Button({
  children,
  className,
  href,
  style,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      style={style}
      className={`cursor-pointer bg-full hover:bg-full/75 active:bg-full/25 transition-colors duration-200 ease-in-out drop-shadow-sm px-3 py-[.45rem] border rounded-full select-none text-muted-foreground ${className}`}
    >
      {children}
    </a>
  );
}
