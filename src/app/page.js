"use client";

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";

const LESSONS = [
  { name: "Lesson #01", flashcards: "/lesson-01/flashcards", quiz: "/lesson-01/quiz" },
  { name: "Lesson #02", flashcards: "/lesson-02/flashcards", quiz: "/lesson-02/quiz" },
  { name: "Lesson #03", flashcards: "/lesson-03/flashcards", quiz: "/lesson-03/quiz" },
  { name: "Lesson #04", flashcards: "/lesson-04/flashcards", quiz: "/lesson-04/quiz" },
  { name: "Lesson #05", flashcards: "/lesson-05/flashcards", quiz: "/lesson-05/quiz" },
  { name: "Lesson #06", flashcards: "/lesson-06/flashcards", quiz: "/lesson-06/quiz" },
  { name: "Lesson #07", flashcards: "/lesson-07/flashcards", quiz: "/lesson-07/quiz" },
  { name: "Lesson #07B", flashcards: "/lesson-07-strat-ote/flashcards", quiz: "/lesson-07-strat-ote/quiz" },
  { name: "Lesson #08", flashcards: "/lesson-08/flashcards", quiz: "/lesson-08/quiz" },
  { name: "Lesson #09", flashcards: "/lesson-09/flashcards", quiz: "/lesson-09/quiz" },
  { name: "Lesson #10", flashcards: "/lesson-10/flashcards", quiz: "/lesson-10/quiz" },
  { name: "Lesson #12", flashcards: "/lesson-12/flashcards", quiz: "/lesson-12/quiz" },
  { name: "Lesson #13", flashcards: "/lesson-13/flashcards", quiz: "/lesson-13/quiz" },
  { name: "Lesson #14", flashcards: "/lesson-14/flashcards", quiz: "/lesson-14/quiz" },
  { name: "Lesson #15", flashcards: "/lesson-15/flashcards", quiz: "/lesson-15/quiz" },
  { name: "Bonus: BFIG (Abi)", flashcards: "/bonus-bfig/flashcards", quiz: "/bonus-bfig/quiz" },
];

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${BLACK} 0%, #12100a 50%, #0d0d0d 100%)`,
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: GOLD, fontSize: 12, letterSpacing: 4, fontWeight: 700, marginBottom: 8 }}>
            ADEXTRADES UNIVERSITY
          </div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Interactive Study Resources
          </div>
          <div style={{ color: "#888", fontSize: 14 }}>
            Flashcards and quizzes for every lesson
          </div>
        </div>

        {LESSONS.map((lesson, i) => (
          <div
            key={i}
            style={{
              background: CHARCOAL,
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 10,
              border: `1px solid #333`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ color: "#e0e0e0", fontSize: 15, fontWeight: 600 }}>
              {lesson.name}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {lesson.flashcards && (
                <a
                  href={lesson.flashcards}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    border: `1.5px solid ${GOLD}`,
                    color: GOLD,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Flashcards
                </a>
              )}
              {lesson.quiz && (
                <a
                  href={lesson.quiz}
                  style={{
                    padding: "8px 16px",
                    background: GOLD,
                    border: `1.5px solid ${GOLD}`,
                    color: BLACK,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Quiz
                </a>
              )}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 30, color: "#555", fontSize: 12 }}>
          whop.com/adextrades
        </div>
      </div>
    </div>
  );
}
