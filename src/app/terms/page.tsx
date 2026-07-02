import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — HobbyHatch",
  description: "The terms governing use of HobbyHatch.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <p>
        By accessing or using HobbyHatch you agree to these terms. HobbyHatch is
        open protocol infrastructure on the Solana blockchain; you use it at your
        own risk.
      </p>

      <LegalSection heading="Eligibility &amp; accounts">
        <p>
          You must be of legal age in your jurisdiction. Your &ldquo;account&rdquo;
          is your self-custodied Solana wallet — you are solely responsible for
          securing it. We never take custody of your assets or keys.
        </p>
      </LegalSection>

      <LegalSection heading="Communities &amp; tokens">
        <p>
          Anyone can create a community and, optionally, mint a community token.
          You are responsible for the content you publish and any token you
          create, including compliance with applicable laws. Community tokens are
          created by users, are not offered or endorsed by HobbyHatch, and may
          have no value.
        </p>
      </LegalSection>

      <LegalSection heading="No financial advice">
        <p>
          Nothing on HobbyHatch is financial, investment, legal, or tax advice.
          Digital assets are volatile and risky. Do your own research and never
          risk more than you can afford to lose.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Don&apos;t use HobbyHatch for unlawful activity, fraud, infringement,
          harassment, or to disrupt the protocol. We may restrict access to the
          hosted interface that violates these terms; the underlying protocol
          remains permissionless.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimers &amp; liability">
        <p>
          The service is provided &ldquo;as is&rdquo; without warranties. To the
          maximum extent permitted by law, HobbyHatch is not liable for any loss
          arising from blockchain transactions, smart-contract behavior, wallet
          issues, or use of the service.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms; continued use means you accept the changes.
          Updates are announced on{" "}
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
