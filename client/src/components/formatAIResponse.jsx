import React from "react";

export function formatAIResponse(rawText) {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const intro = [];
  const tips = [];

  let isTips = false;
  for (let line of lines) {
    if (/^\d\./.test(line)) {
      isTips = true;
      tips.push(line.replace(/^\d+\.\s*/, ""));
    } else if (isTips && tips.length > 0) {
      // Continuation of a previous tip
      tips[tips.length - 1] += " " + line;
    } else {
      intro.push(line);
    }
  }

  // If there are no numbered tips but it’s a long paragraph, chunk it
  if (
    !isTips &&
    tips.length === 0 &&
    intro.length === 1 &&
    intro[0].length > 250
  ) {
    const chunks = intro[0].match(/[^.!?]+[.!?]+/g) || [intro[0]];
    intro.length = 0; // Clear existing
    chunks.forEach((chunk) => {
      intro.push(chunk.trim());
    });
  }

  return (
    <div className="space-y-4 text-gray-800 leading-relaxed">
      {intro.map((p, i) => (
        <p key={"intro-" + i} className="text-[1.05rem]">
          {p}
        </p>
      ))}

      {tips.length > 0 && (
        <ol className="list-decimal ml-5 space-y-2">
          {tips.map((tip, i) => (
            <li key={"tip-" + i} className="text-[1.05rem]">
              {tip}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
