/**
 * Server-safe word splitter for scroll scenes. Screen readers get the plain
 * sentence once; the split words are hidden from assistive tech.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={i} data-word className="inline-block">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}
