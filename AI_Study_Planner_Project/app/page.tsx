 "use client";

import { useState } from "react";

type Session = {
  subject: string;
  topic: string;
  duration: number;
  priority: "low" | "medium" | "high";
};

export default function Home() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [hours, setHours] = useState(3);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePlan() {
    setError("");
    if (!subject.trim() || !topic.trim()) {
      setError("Please enter a subject and topic.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, topic, availableHours: hours })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to generate plan.");
      setSessions(data.schedule[0]?.sessions ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">AI STUDY PLANNER</p>
        <h1>Turn your syllabus into a plan.</h1>
        <p className="intro">Create a focused study schedule with AI assistance, then review and control every session.</p>
      </header>

      <section className="card" aria-labelledby="planner-form-title">
        <h2 id="planner-form-title">Build your plan</h2>
        <div className="grid">
          <label>Subject<input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. DBMS" /></label>
          <label>Topic<input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Normalization" /></label>
          <label>Hours per day<input type="number" min="1" max="12" value={hours} onChange={e => setHours(Number(e.target.value))} /></label>
        </div>
        <button onClick={generatePlan} disabled={loading}>
          {loading ? "Generating…" : "Generate AI Study Plan"}
        </button>
        {error && <p className="error" role="alert">{error}</p>}
      </section>

      <section className="card" aria-labelledby="sessions-title">
        <h2 id="sessions-title">Today's sessions</h2>
        {sessions.length === 0 ? (
          <p className="muted">Your generated sessions will appear here.</p>
        ) : (
          <ul className="sessions">
            {sessions.map((s, i) => (
              <li key={i}>
                <strong>{s.subject}</strong>
                <span>{s.topic}</span>
                <span>{s.duration} min · {s.priority} priority</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
