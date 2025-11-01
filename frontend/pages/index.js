import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState("");

  const generateIdeas = async () => {
    const res = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setIdeas(data.ideas);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-3">ReflexMind 💡</h1>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 w-96"
        placeholder="Enter your topic..."
      />
      <button
        onClick={generateIdeas}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Generate
      </button>

      {ideas && (
        <pre className="mt-5 bg-gray-100 p-3 rounded w-96 whitespace-pre-wrap">
          {ideas}
        </pre>
      )}
    </div>
  );
}
