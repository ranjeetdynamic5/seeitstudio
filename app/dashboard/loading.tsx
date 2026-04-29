export default function DashboardLoading() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ ...shimmer, width: "120px", height: "24px", borderRadius: "6px" }} />
            <div style={{ ...shimmer, width: "200px", height: "16px", borderRadius: "6px" }} />
          </div>
          <div style={{ ...shimmer, width: "64px", height: "20px", borderRadius: "6px" }} />
        </div>

        <div style={{ ...shimmer, width: "120px", height: "18px", borderRadius: "6px", marginBottom: "16px" }} />

        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "#f1f5f9", padding: "11px 16px", display: "flex", gap: "40px" }}>
            {["100px", "80px", "80px", "100px"].map((w, i) => (
              <div key={i} style={{ ...shimmer, width: w, height: "14px", borderRadius: "4px" }} />
            ))}
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid #e2e8f0",
                padding: "14px 16px",
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              {["100px", "80px", "80px", "100px"].map((w, j) => (
                <div key={j} style={{ ...shimmer, width: w, height: "14px", borderRadius: "4px" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const shimmer: React.CSSProperties = {
  background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.4s infinite",
};
