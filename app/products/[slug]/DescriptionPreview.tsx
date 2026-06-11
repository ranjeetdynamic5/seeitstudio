'use client'

import dynamic from 'next/dynamic'

const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then((m) => m.default.Markdown),
  { ssr: false }
)

export default function DescriptionPreview({ source }: { source: string }) {
  return (
    <div data-color-mode="light" className="prose prose-slate max-w-none text-[#64748B] overflow-hidden">
      <style>{`
        .wmde-markdown {
          background: transparent !important;
          color: #475569 !important;
          font-family: inherit !important;
          font-size: 0.95rem !important;
          overflow-x: hidden !important;
        }
        .wmde-markdown h1, .wmde-markdown h2, .wmde-markdown h3 {
          color: #092145 !important;
          font-weight: 600 !important;
          background: transparent !important;
        }
        .wmde-markdown ul, .wmde-markdown ol {
          padding-left: 1.5rem !important;
        }
        .wmde-markdown li {
          margin: 0.25rem 0 !important;
        }
        .wmde-markdown pre {
          background: #f1f5f9 !important;
          border-radius: 6px !important;
          overflow-x: auto !important;
          max-width: 100% !important;
          padding: 0.75rem 1rem !important;
        }
        .wmde-markdown code {
          background: #f1f5f9 !important;
          color: #334155 !important;
          border-radius: 4px !important;
          font-family: inherit !important;
          font-size: 0.9em !important;
          padding: 0.1em 0.3em !important;
        }
        .wmde-markdown pre code {
          background: transparent !important;
          padding: 0 !important;
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }
        .wmde-markdown blockquote {
          border-left: 3px solid #e2e8f0 !important;
          color: #64748B !important;
          background: transparent !important;
        }
      `}</style>
      <MDPreview source={source} />
    </div>
  )
}