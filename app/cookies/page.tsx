import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Seeit Studio",
  description: "Cookie Policy for Seeit Studio — how we use cookies and similar technologies on our website.",
  alternates: { canonical: "https://seeitstudio.com/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-2">Cookie Policy</h1>
          <p className="text-sm text-[#64748B] mb-10">Last updated: June 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">1. What Are Cookies</h2>
              <p className="text-[#64748B] leading-relaxed">
                Cookies are small text files placed on your device when you visit a website. They help websites
                remember your preferences, understand how you use the site, and provide a better experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">2. How We Use Cookies</h2>
              <p className="text-[#64748B] leading-relaxed mb-3">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-[#64748B]">
                <li><strong>Essential cookies</strong> — required for the website to function, including authentication and cart functionality</li>
                <li><strong>Preference cookies</strong> — remember your settings and preferences</li>
                <li><strong>Analytics cookies</strong> — help us understand how visitors use our site so we can improve it</li>
                <li><strong>Marketing cookies</strong> — used to deliver relevant advertisements (only with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">3. Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-[#64748B] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 pr-4 font-semibold text-[#092145]">Cookie</th>
                      <th className="text-left py-2 pr-4 font-semibold text-[#092145]">Type</th>
                      <th className="text-left py-2 font-semibold text-[#092145]">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">cart-storage</td>
                      <td className="py-2 pr-4">Essential</td>
                      <td className="py-2">Stores your shopping cart items</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">sb-auth-token</td>
                      <td className="py-2 pr-4">Essential</td>
                      <td className="py-2">Keeps you logged in to your account</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 pr-4">_ga</td>
                      <td className="py-2 pr-4">Analytics</td>
                      <td className="py-2">Google Analytics — tracks site usage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">4. Managing Cookies</h2>
              <p className="text-[#64748B] leading-relaxed">
                You can control and manage cookies through your browser settings. Most browsers allow you to
                refuse or delete cookies. Please note that disabling essential cookies may affect the
                functionality of our website, including your ability to log in or use the shopping cart.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">5. Third-Party Cookies</h2>
              <p className="text-[#64748B] leading-relaxed">
                Some cookies on our site are set by third-party services such as Google Analytics. These
                third parties have their own privacy policies governing how they use the data collected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">6. Contact Us</h2>
              <p className="text-[#64748B] leading-relaxed">
                If you have questions about our use of cookies, please contact us at hello@seeitstudio.com.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}