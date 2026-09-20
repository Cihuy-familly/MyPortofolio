export function summarize(value, maxLength = 360) {
  const paragraphs = String(value || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const summary = paragraphs.find((paragraph) => paragraph.length > 70) || paragraphs[0] || "";

  if (summary.length <= maxLength) {
    return summary;
  }

  const shortened = summary.slice(0, maxLength);
  const sentenceEnd = Math.max(shortened.lastIndexOf(". "), shortened.lastIndexOf("; "));
  const safeEnd = sentenceEnd > maxLength * 0.55 ? sentenceEnd + 1 : shortened.lastIndexOf(" ");

  return `${shortened.slice(0, safeEnd).trim()}...`;
}

export function sortExperiences(experiences) {
  return [...experiences].sort((a, b) => {
    const aCurrent = /present/i.test(a.period || "");
    const bCurrent = /present/i.test(b.period || "");

    if (aCurrent !== bCurrent) {
      return aCurrent ? -1 : 1;
    }

    return Number(b.id || 0) - Number(a.id || 0);
  });
}
