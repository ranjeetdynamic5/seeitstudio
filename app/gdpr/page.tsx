import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GDPR | Seeit Studio",
  description: "GDPR compliance information for Seeit Studio — your rights and how we protect your data under UK GDPR.",
  alternates: { canonical: "https://seeitstudio.com/gdpr" },
};

export default function GdprPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-2">GDPR Compliance</h1>
          <p className="text-sm text-[#64748B] mb-10">Last updated: June 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">1. Our Commitment</h2>
              <p className="text-[#64748B] leading-relaxed">
                Seeit Studio Ltd is committed to protecting your personal data in accordance with the UK General
                Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This page explains your
                rights and how we fulfil our obligations as a data controller.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">2. Data Controller</h2>
              <p className="text-[#64748B] leading-relaxed">
                Seeit Studio Ltd is the data controller for personal data collected through this website.
                You can contact us at hello@seeitstudio.com with any data protection queries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">3. Your Rights Under UK GDPR</h2>
              <p className="text-[#64748B] leading-relaxed mb-3">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#64748B]">
                <li><strong>Right of access</strong> — request a copy of the personal data we hold about you</li>
                <li><strong>Right to rectification</strong> — request correction of inaccurate or incomplete data</li>
                <li><strong>Right to erasure</strong> — request deletion of your personal data ("right to be forgotten")</li>
                <li><strong>Right to restrict processing</strong> — request that we limit how we use your data</li>
                <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format</li>
                <li><strong>Right to object</strong> — object to processing based on legitimate interests or for direct marketing</li>
                <li><strong>Rights related to automated decision-making</strong> — not be subject to solely automated decisions that significantly affect you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">4. How to Exercise Your Rights</h2>
              <p className="text-[#64748B] leading-relaxed">
                To exercise any of your rights, please contact us at hello@seeitstudio.com. We will respond
                to your request within 30 days. We may need to verify your identity before processing your request.
                There is no charge for exercising your rights unless the request is manifestly unfounded or excessive.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">5. Legal Bases for Processing</h2>
              <p className="text-[#64748B] leading-relaxed mb-3">We process your personal data on the following legal bases:</p>
              <ul className="list-disc pl-5 space-y-1 text-[#64748B]">
                <li><strong>Contract</strong> — processing necessary to fulfil your order or provide our services</li>
                <li><strong>Legal obligation</strong> — processing required by UK law (e.g. tax records)</li>
                <li><strong>Legitimate interests</strong> — processing for our business purposes where your rights are not overridden</li>
                <li><strong>Consent</strong> — where you have given explicit consent (e.g. marketing emails)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">6. International Transfers</h2>
              <p className="text-[#64748B] leading-relaxed">
                Some of our service providers may process data outside the UK. Where this occurs, we ensure
                appropriate safeguards are in place, such as UK adequacy decisions or standard contractual clauses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">7. Data Breaches</h2>
              <p className="text-[#64748B] leading-relaxed">
                In the event of a personal data breach that is likely to result in a risk to your rights and
                freedoms, we will notify the ICO within 72 hours and inform you without undue delay where required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">8. Complaints</h2>
              <p className="text-[#64748B] leading-relaxed">
                If you are unhappy with how we handle your personal data, you have the right to lodge a complaint
                with the Information Commissioner&apos;s Office (ICO) at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#0066FF] hover:underline">
                  ico.org.uk
                </a>{" "}
                or by calling 0303 123 1113.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}