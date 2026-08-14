import { CONTAINER, SECTION } from "@/lib/styles";

interface Props {
  id: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  className = "",
  innerClassName = "",
  children,
}: Props) {
  return (
    <section id={id} className={`${SECTION} ${className}`}>
      <div className={`${CONTAINER} ${innerClassName}`}>{children}</div>
    </section>
  );
}
