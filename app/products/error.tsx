"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <p className="text-base font-semibold text-[#0B0F19] mb-1">Failed to load products</p>
        <p className="text-sm text-[#64748B] mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium text-white bg-[#00334e] rounded-lg hover:bg-[#00527d] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
