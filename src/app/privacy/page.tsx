import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — HobbyHatch",
  description: "How HobbyHatch handles data and privacy.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        HobbyHatch (&ldquo;HobbyHatch&rdquo;, &ldquo;we&rdquo;) is a
        Solana-native protocol for creating community-owned hobby economies. This
        policy explains what we collect when you use the HobbyHatch website and
        app, and how we use it. We aim to collect as little as possible.
      </p>

      <LegalSection heading="Wallet &amp; on-chain data">
        <p>
          HobbyHatch uses wallet-based sign-in — we never ask for your email,
          password, or private keys, and we cannot access your funds. When you
          connect a wallet we process your public wallet address to
          authenticate you and associate your activity (communities you create,
          join, or follow). Transactions you approve are recorded on the public
          Solana blockchain, which is outside our control.
        </p>
      </LegalSection>

      <LegalSection heading="Information we process">
        <p>
          Content you submit — community names, descriptions, images, links, and
          posts — and basic technical data (IP address, device/browser
          information, and usage analytics) used to operate, secure, and improve
          the service. We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies &amp; local storage">
        <p>
          We use essential cookies and browser local storage to keep you signed
          in and remember preferences. We may use privacy-respecting analytics to
          understand aggregate usage.
        </p>
      </LegalSection>

      <LegalSection heading="Third parties">
        <p>
          We rely on infrastructure providers (e.g. hosting, RPC, and analytics)
          that process data on our behalf. Wallet providers and the Solana
          network operate under their own terms and privacy policies.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can disconnect your wallet at any time and request deletion of
          off-chain data associated with your address. On-chain data is
          permanent and cannot be deleted.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions? Reach us on{" "}
          <a
            href="https://x.com/hobbyhatch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2"
          >
            X (@hobbyhatch)
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
