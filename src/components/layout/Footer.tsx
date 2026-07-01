import { Container } from "@/components/ui/Container";
import { XIcon, GithubIcon, DiscordIcon } from "@/components/ui/icons";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Protocol",
    links: ["Communities", "Tokenization", "Governance", "Marketplace", "Reputation"],
  },
  {
    title: "Developers",
    links: ["Documentation", "SDK", "Solana Programs", "GitHub", "Audits"],
  },
  {
    title: "Ecosystem",
    links: ["Built on Solana", "$HOBBY on Orynth", "Grants", "Roadmap", "Blog"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-paper/60">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo size={34} />
              <span className="text-[17px] font-semibold tracking-tight text-ink">
                HobbyHatch
              </span>
            </div>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink-muted">
              A Solana-native protocol for creating tokenized hobby communities.
              Every passion deserves its own economy — owned by the people who
              build it. The $HOBBY token launches on Orynth.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[XIcon, GithubIcon, DiscordIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink/20 hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[15px] text-ink-muted transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-ink-faint">
            © {new Date().getFullYear()} HobbyHatch Protocol. Built on Solana · $HOBBY launches on Orynth · Platform live July 15, 2026.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-ink-faint">
            <a href="#" className="transition-colors hover:text-ink-muted">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink-muted">
              Terms
            </a>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
