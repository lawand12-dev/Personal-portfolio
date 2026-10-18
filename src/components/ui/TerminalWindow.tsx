import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const transcriptLines = [
  { text: "$ whoami", type: "command" },
  { text: "Frontend developer — React · TypeScript · Motion", type: "output" },
  { text: "", type: "spacer" },
  { text: "$ cat goals.md", type: "command" },
  { text: "Building fast, accessible interfaces.", type: "output" },
  { text: "Open to frontend roles and internships.", type: "output" },
] as const;

const transcript = transcriptLines.map(({ text }) => text).join("\n");

function TerminalWindow() {
  const shouldReduceMotion = useReducedMotion();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const visibleCharactersRef = useRef(0);
  const visibleTranscript = shouldReduceMotion
    ? transcript
    : transcript.slice(0, visibleCharacters);
  const visibleLines = visibleTranscript.split("\n");

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let timeout: number;
    const typeNextCharacter = () => {
      const nextCharacterIndex = Math.min(
        visibleCharactersRef.current + 1,
        transcript.length,
      );
      visibleCharactersRef.current = nextCharacterIndex;
      setVisibleCharacters(nextCharacterIndex);

      if (nextCharacterIndex >= transcript.length) {
        return;
      }

      const justTypedNewline = transcript[nextCharacterIndex - 1] === "\n";
      timeout = window.setTimeout(
        typeNextCharacter,
        justTypedNewline ? 300 : 40,
      );
    };

    timeout = window.setTimeout(typeNextCharacter, 40);

    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <aside
      aria-label="Introduction in terminal format"
      className="portfolio-terminal"
    >
      <div className="portfolio-terminal-titlebar">
        <div className="portfolio-terminal-title">
          <div aria-hidden="true" className="portfolio-terminal-controls">
            <span className="portfolio-terminal-control portfolio-terminal-control--close" />
            <span className="portfolio-terminal-control portfolio-terminal-control--minimize" />
            <span className="portfolio-terminal-control portfolio-terminal-control--maximize" />
          </div>
          <span>~/intro</span>
        </div>
        <span className="portfolio-terminal-status">read only</span>
      </div>
      <div className="portfolio-terminal-body">
        <p className="sr-only">
          Terminal transcript: whoami. Frontend developer — React · TypeScript ·
          Motion. cat goals.md. Building fast, accessible interfaces. Open to
          frontend roles and internships.
        </p>
        <div aria-hidden="true" className="portfolio-terminal-animation">
          <pre className="portfolio-terminal-reserve">{transcript}</pre>
          <pre className="portfolio-terminal-output">
            {visibleLines.map((line, index) => {
              const { type } = transcriptLines[index];
              const content =
                type === "command" && line.startsWith("$ ") ? (
                  <>
                    <span className="portfolio-terminal-prompt">$</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                );

              return (
                <span
                  className={`portfolio-terminal-line portfolio-terminal-line--${type}`}
                  key={`${type}-${index}`}
                >
                  {index > 0 && "\n"}
                  {content}
                </span>
              );
            })}
            <span className="portfolio-terminal-cursor" />
          </pre>
        </div>
      </div>
    </aside>
  );
}

export default TerminalWindow;
