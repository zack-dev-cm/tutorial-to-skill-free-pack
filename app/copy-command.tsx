"use client";

import { useState } from "react";

type CopyCommandProps = {
  command: string;
  label: string;
  sourceHref?: string;
};

export default function CopyCommand({ command, label, sourceHref }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="command-row">
      <div>
        <span className="command-label">{label}</span>
        <CommandText command={command} />
      </div>
      <div className="command-actions">
        <button type="button" onClick={copyCommand}>{copied ? "Copied" : "Copy"}</button>
        {sourceHref ? <a href={sourceHref}>Source</a> : null}
      </div>
    </div>
  );
}

function CommandText({ command }: { command: string }) {
  const installPrefix = "openclaw skills install ";
  if (command.startsWith(installPrefix)) {
    return (
      <code>
        <span className="cmd-prefix">openclaw skills install</span>{" "}
        <span className="cmd-slug">{command.slice(installPrefix.length)}</span>
      </code>
    );
  }

  return <code>{command}</code>;
}
