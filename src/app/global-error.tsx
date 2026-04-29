"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            fontFamily: "system-ui, sans-serif",
            background: "#F4F7F6",
            color: "#102033",
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: "520px",
              border: "1px solid #D9E2E0",
              borderRadius: "8px",
              background: "#fff",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#C99A2E", fontWeight: 700 }}>
              Something went wrong
            </p>
            <h1 style={{ marginTop: "12px", fontSize: "30px" }}>
              The application could not load
            </h1>
            <button
              onClick={reset}
              type="button"
              style={{
                marginTop: "24px",
                border: 0,
                borderRadius: "6px",
                background: "#0F5D50",
                color: "#fff",
                padding: "10px 16px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
