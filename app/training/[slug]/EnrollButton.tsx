"use client";

import { useState } from "react";
import EnrollModal from "@/app/components/EnrollModal";

export default function EnrollButton({ courseTitle }: { courseTitle: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
      >
        Enroll Now
      </button>

      <EnrollModal
        isOpen={open}
        courseTitle={courseTitle}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
