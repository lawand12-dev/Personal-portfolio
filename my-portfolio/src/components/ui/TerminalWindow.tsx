function TerminalWindow() {
  return (
    <aside aria-label="Introduction in terminal format" className="portfolio-terminal">
      <div className="portfolio-terminal-titlebar">
        <span>~/intro</span>
        <span className="portfolio-terminal-status">static text</span>
      </div>
      <div className="portfolio-terminal-body">
        <p className="portfolio-terminal-command">
          <span aria-hidden="true">$ </span>whoami
        </p>
        <p>Junior frontend developer — React · TypeScript</p>
        <p className="portfolio-terminal-command">
          <span aria-hidden="true">$ </span>cat goals.md
        </p>
        <p>
          Seeking a junior frontend role.
          <br />
          Learning by building and sharing what I learn.
        </p>
      </div>
    </aside>
  )
}

export default TerminalWindow
