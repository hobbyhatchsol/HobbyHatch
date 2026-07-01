import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  children,
  className,
  id,
  containerClassName,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-24 sm:py-32 lg:py-40", className)}
    >
      <Container wide={wide} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
