import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SeeIt Studio",
  description: "Privacy Policy for SeeIt Studio — how we collect, use, and protect your personal data.",
  alternates: { canonical: "https://seeitstudio.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[#64748B] mb-10">Last updated: June 2025</p>

          <div className="space-y-8 text-[#64748B] leading-relaxed">

            <p>
              The following statement sets out our privacy statement in order to demonstrate our firm commitment
              to privacy and the use of information which we obtain from you through your use of this site.
              This information will be used to process your order of goods from us. Also, if you have opted in
              on the relevant page on this website, we will use your personal information to keep you up to date
              about similar products and services that we offer. All submissions of personal information and
              payment details are protected by SSL encryption.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">GDPR</h2>
              <p className="mb-3">
                The acronym &quot;GDPR&quot; stands for General Data Protection Regulation. This is a data privacy law
                adopted by the European Parliament in 2016. GDPR strengthens the rights that individuals have
                regarding their personal data, and seeks to unify data protection laws across Europe.
              </p>
              <p className="mb-3">If you&apos;re in the EU or UK, you may be able to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ask for a copy of the personal data we&apos;ve collected about you</li>
                <li>Ask for a copy of the personal data you provided for our products and services</li>
                <li>Request that we stop sending you direct marketing messages</li>
                <li>Ask that we stop using your personal data for certain purposes, or for a period of time</li>
                <li>Ask that we amend or delete your personal data</li>
                <li>If we ask for consent to process your personal data, you can later withdraw your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">What Personal Information Do We Store?</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your name and contact information including postal address, email address and telephone number</li>
                <li>Details of any purchases/orders that you place through the website, and any additional information supplied for delivery</li>
                <li>Details you provide when you make payment, contact us or make enquiries either generally or about any purchases you make with us. Also, when buying any software or hardware product subscription, you are agreeing that SeeIt Studio notifies you in advance of upcoming software renewals to avoid business disruption</li>
                <li>Details of your visits to the website and the resources that you access</li>
              </ul>
              <p className="mt-3 font-medium text-[#092145]">
                We do not store credit card details or share customer details with any third parties unless required to process your order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">How Do We Use Your Information?</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To enable us to process an order or enquiry from you</li>
                <li>To keep you up to date with upcoming product expiry dates, avoiding service downtime</li>
                <li>For statistical purposes to improve the services we provide</li>
                <li>To administer our business</li>
                <li>To notify you of topics that may be of interest to you</li>
                <li>Completing or supporting any transaction or activity you have with us</li>
                <li>Research and development</li>
                <li>Analysis and reporting</li>
                <li>To help us prevent fraudulent transactions</li>
              </ul>
              <p className="mt-3">
                Only authorised employees, agents and contractors (who have agreed to keep information secure and
                confidential) have access to this information. All emails and newsletters from this site allow you
                to opt out of further mailings.
              </p>
              <p className="mt-3 font-medium text-[#092145]">
                We will not rent, sell or otherwise disclose your personal information to unrelated third parties
                without your consent, except as stated in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Distribution of Information</h2>
              <p className="mb-3">
                We may share information with governmental agencies or other companies assisting us in fraud
                prevention or investigation. We may do so when:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Permitted or required by law</li>
                <li>Trying to protect against or prevent actual or potential fraud or unauthorised transactions</li>
                <li>Investigating fraud which has already taken place</li>
              </ul>
              <p className="mt-3">The information is not provided to these companies for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Cookies</h2>
              <p>
                Cookies are used on our website, but only to keep track of the contents of your shopping cart
                and to maintain your login session. Cookies are small data text files sent from a server during
                a browsing session. Your browser settings allow you to disable cookies, however doing so may
                prevent you from accessing all services on this site. For more information, see our{" "}
                <a href="/cookies" className="text-[#0066FF] hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Changes to This Policy</h2>
              <p>
                We reserve the right to make changes to this policy. Any changes will be posted on this page.
                If you have any concerns or questions about our privacy policy, please{" "}
                <a href="/contact" className="text-[#0066FF] hover:underline">contact us</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}