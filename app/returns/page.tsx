import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shipments & Returns | SeeIt Studio",
  description: "Shipments and returns policy for SeeIt Studio — delivery times, returns process, and software licence information.",
  alternates: { canonical: "https://seeitstudio.com/returns" },
};

export default function ReturnsPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-2">Shipments &amp; Returns</h1>
          <p className="text-sm text-[#64748B] mb-10">Last updated: June 2025</p>

          <div className="space-y-8 text-[#64748B] leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Packaged Goods Shipments</h2>
              <p>
                We aim to dispatch all packaged goods orders via physical delivery within 7–10 working days
                after receipt of payment. Goods are shipped via recorded delivery with tracking and signature
                on arrival.
              </p>
              <p className="mt-3">
                Shipping fees include handling, packing and postage costs where applicable. Handling fees are
                fixed; however transportation fees may vary according to the total weight of your shipment.
                We advise you to combine your items in one order as we cannot group two distinct orders placed
                separately — shipping fees will apply to each order individually.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Returning Faulty Hardware</h2>
              <p>
                If your goods are confirmed as faulty within 14 days, we will happily exchange them and may
                put you in touch with the manufacturer if this is the quickest route to a replacement.
                After 14 days, if your goods turn out to be faulty, we will refer you to the manufacturer directly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Returning Non-Faulty Hardware</h2>
              <p>
                The return of goods in full working order for refund or credit is at our discretion within
                one month of the invoice date (your rights under the Consumer Credit Act will be taken into
                account). The item must be in as-new condition and in the original packaging as delivered.
                Re-stocking fees between 10% and 50% will be applied depending on the condition of the
                returned items.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Returning Sealed Software</h2>
              <p>
                Returning any software, even if sealed in its original box, is at our discretion and will
                depend entirely on the individual manufacturer&apos;s policy. Some software will automatically
                be allocated a non-returnable licence to the end user based on the purchase information,
                even if it is a boxed product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Returning Software Delivered Electronically</h2>
              <p>
                As there is no physical packaging, the licence is provided directly to you and must be treated
                in the same way as an opened box. Unfortunately, we are unable to take this back and return it
                to developers. Please carefully double-check that you are purchasing the correct item and that
                your computer hardware meets the minimum specification to run the software before purchasing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#092145] mb-3">Electronic Software — Downloads Only</h2>
              <p>
                For all software purchases as &quot;download only&quot;, you will receive your software licence
                serial code directly to your confirmed email address within 4–48 hours (Monday–Friday, 9am–5pm,
                excluding bank holidays and weekends). Orders placed at weekends or on bank holidays will be
                processed on the next available working day.
              </p>
              <p className="mt-3">
                Should you not receive your licence code, please{" "}
                <a href="/contact" className="text-[#0066FF] hover:underline">contact us</a> immediately.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}