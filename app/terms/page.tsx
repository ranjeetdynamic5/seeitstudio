import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | SeeIt Studio",
  description: "Terms and Conditions for SeeIt Studio — the rules and conditions governing use of our website and services.",
  alternates: { canonical: "https://seeitstudio.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-2">Terms and Conditions</h1>
          <p className="text-sm text-[#64748B] mb-10">Last updated: June 2025</p>

          <div className="space-y-8 text-[#64748B] leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">General Terms of Use</h2>
              <p>
                Access to and use of this website and the information, materials, products and services available
                through this website are subject to all applicable laws and regulations and to these Terms and
                Conditions of Use. By accessing this website, you agree to these Terms of Use which form a legally
                binding agreement. If you do not agree, please exit this website. These Terms of Use may be changed
                by us from time to time without specific notice to you. The latest Terms of Use will be posted on
                the website, and you should always review these Terms of Use prior to using the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Product &amp; Services Information</h2>
              <p>
                All references on this website to information, materials, products and services apply to those
                available in the countries or jurisdictions specified, unless otherwise stated. Nothing in this
                website constitutes an offer to buy or sell our products or services in any jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">General Terms</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All information on seeitstudio.com is supplied to ensure factual correctness. However, SeeIt Studio cannot be held responsible for mistakes, technical problems or misinterpretations.</li>
                <li>Pricing errors are rare, but where they occur SeeIt Studio will endeavour to uphold the advertised price. However, we reserve the right to cancel an order or part of an order should this not be possible.</li>
                <li>All software quotations are valid within the current calendar month only and for a maximum of 14 days.</li>
                <li>As software prices can fluctuate outside our control, we reserve the right to withdraw quotations without notice.</li>
                <li>All quotations are confidential and for the intended recipient only. Quotations are not transferable.</li>
                <li>Any software/hardware purchased must be paid in full no later than 30 days from the date of our invoice.</li>
                <li>Delayed payments beyond 30 days shall be subject to the given amount × 10% divided by 12 = amount per month.</li>
                <li>All software, services and support contract purchases are non-refundable and non-returnable.</li>
                <li>It is the responsibility of the purchaser to ensure their computer hardware meets the minimum specification to run the software.</li>
                <li>For software orders, new licence codes are generally delivered within 1–6 hours upon receipt of approved payment.</li>
                <li>For orders requiring overseas processing from our vendors, you may need to wait until the next business day to receive your licence due to time differences.</li>
                <li>Should a dispute arise, SeeIt Studio&apos;s maximum liability will be to refund the order in full.</li>
                <li>Any refunds requested for software orders may be subject to an administration fee of up to 8% of the order value.</li>
                <li>We reserve the right to cancel any order or block any customer from placing an order at our discretion.</li>
                <li>Users are responsible for the information they post in reviews or otherwise submit to SeeIt Studio.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Expired Subscription Renewals</h2>
              <p>
                Should you allow your subscription to expire, an administrative fee of 8% of the Recommended Retail
                Price (RRP) of the product will be applied upon renewal. This fee reflects the additional time
                required by our administrative team to reinstate the subscription.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Cancellations &amp; Rescheduling</h2>
              <p className="mb-3">
                SeeIt Studio will charge a fee for any training course booking which is subsequently cancelled
                or rescheduled as follows:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>More than 14 days before course start date — no charge</li>
                <li>14–3 days before course start date — 50% of course fee payable</li>
                <li>Less than 3 days before course start date — 100% of course fee payable</li>
              </ul>
              <p className="mt-3">
                SeeIt Studio cannot be held responsible for any costs incurred by the customer if a scheduled
                training course is postponed by SeeIt Studio due to illness or any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Link Disclaimer</h2>
              <p>
                This website may contain links to other websites maintained by us or by unrelated companies and
                persons. A link to another website does not mean that we approve, endorse or accept any
                responsibility for that website, its content or use. We are not responsible for the actions,
                content, accuracy or opinions expressed on linked websites. If you decide to leave our website
                and access these other websites, you do so at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">System Requirements</h2>
              <p className="font-medium text-[#092145]">
                It is the client&apos;s responsibility to ensure that their computer systems are able to accommodate
                software purchased from SeeIt Studio. Please enquire prior to making purchases.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}