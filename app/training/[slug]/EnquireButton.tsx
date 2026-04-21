"use client";

import { useState } from "react";
import EnquiryModal from "@/app/components/EnquiryModal";

export default function EnquireButton({ training }: { training: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Enquire Now
      </button>

      <EnquiryModal
        isOpen={open}
        title={training?.title}
        onClose={() => setOpen(false)}
      />
    </>
  );
}