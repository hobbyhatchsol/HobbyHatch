import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <Container className="max-w-3xl">
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-ink-muted">
            Legal
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-display font-semibold tracking-tightest text-ink">
            {title}
          </h1>
          <p className="mt-3 text-[14px] text-ink-faint">Last updated {updated}</p>
          <div className="prose-legal mt-10 flex flex-col gap-8 text-[15px] leading-relaxed text-ink-soft">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-tight text-ink">{heading}</h2>
      {children}
    </section>
  );
}
