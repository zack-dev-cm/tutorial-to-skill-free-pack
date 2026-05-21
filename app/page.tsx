import SubscribeForm from "./subscribe-form";
import CopyCommand from "./copy-command";

const repoUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";
const releaseUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases/tag/v0.1.0";
const feedbackUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/issues/1";
const deployDocsUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/blob/main/docs/vercel-email-deploy.md";
const publicationReceiptUrl = `${repoUrl}/blob/main/deployments/clawhub-publication-2026-05-21.md`;

const skills = [
  {
    name: "ai-video-scene-director",
    title: "AI Video Scene Director",
    command: "openclaw skills install ai-video-scene-director",
    purpose: "Turns a video concept into continuity notes, shot order, generator prompts, repair prompts, and credit-risk checks.",
    bestFor: "AI video scenes, product teasers, character continuity, low-waste generation planning.",
    receipt: `${repoUrl}/blob/main/proof-cards/ai-video-scene-director-runtime-receipt.md`,
    source: `${repoUrl}/tree/main/skills/ai-video-scene-director`
  },
  {
    name: "affiliate-ugc-test-planner",
    title: "Affiliate UGC Test Planner",
    command: "openclaw skills install affiliate-ugc-test-planner",
    purpose: "Turns a product idea into compliant hooks, UGC briefs, disclosure handling, metrics, and kill criteria.",
    bestFor: "Small organic affiliate tests where claim safety and budget control matter before scaling.",
    receipt: `${repoUrl}/blob/main/proof-cards/affiliate-ugc-test-planner-runtime-receipt.md`,
    source: `${repoUrl}/tree/main/skills/affiliate-ugc-test-planner`
  }
];

export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="/">Tutorial-to-Skill</a>
          <nav className="nav" aria-label="Primary">
            <a href="#install">Install</a>
            <a href="#skills">Skills</a>
            <a href="#receipts">Receipts</a>
            <a href="#updates">Updates</a>
            <a href={repoUrl}>GitHub</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">MIT-0 / ClawHub registry / v0.1.0</div>
            <h1>Install two open ClawHub skills for tutorial workflows.</h1>
            <p className="lead">
              Install the skills, inspect the Markdown source, then check the runtime receipts before trusting the workflow.
              No paid claims, copied creator prompts, or hidden automation.
            </p>

            <div className="hero-actions" aria-label="Primary actions">
              <a className="button primary" href="#install">Copy install commands</a>
              <a className="button secondary" href={publicationReceiptUrl}>View validation receipts</a>
            </div>
          </div>

          <aside className="install-panel" id="install" aria-label="ClawHub install commands">
            <div className="panel-head">
              <p className="panel-kicker">Install from ClawHub</p>
              <span className="version-badge">latest: 0.1.0</span>
            </div>
            <div className="command-stack">
              {skills.map((skill) => (
                <CopyCommand command={skill.command} key={skill.name} label={skill.name} sourceHref={skill.source} />
              ))}
              <CopyCommand command="openclaw skills info" label="verify install" />
            </div>
            <div className="ledger-mini" aria-label="Validation summary">
              <span>Published</span>
              <span>OpenClaw install tested</span>
              <span>MIT-0</span>
              <span>No paid claims</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="proof-strip" aria-label="Proof summary">
        <div className="container proof-strip-grid">
          <div><strong>2</strong><span>ClawHub listings</span></div>
          <div><strong>2</strong><span>Runtime receipts</span></div>
          <div><strong>MIT-0</strong><span>Free to use and modify</span></div>
          <div><strong>No</strong><span>paid-performance claims</span></div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Published skills</p>
            <h2>Installable workflows with source and receipts attached.</h2>
          </div>

          <div className="skill-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.name}>
                <div className="skill-card-head">
                  <div>
                    <p className="skill-slug">{skill.name}</p>
                    <h3>{skill.title}</h3>
                  </div>
                  <span className="status-pill">ClawHub</span>
                </div>
                <p>{skill.purpose}</p>
                <dl>
                  <div>
                    <dt>Best for</dt>
                    <dd>{skill.bestFor}</dd>
                  </div>
                  <div>
                    <dt>Install</dt>
                    <dd><code>{skill.command}</code></dd>
                  </div>
                </dl>
                <div className="card-links">
                  <a href={skill.source}>Inspect source</a>
                  <a href={skill.receipt}>View runtime receipt</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section ledger-section" id="receipts">
        <div className="container ledger-grid">
          <div>
            <p className="section-kicker">Validation ledger</p>
            <h2>What was actually checked.</h2>
            <p className="section-intro">
              The pack is intentionally small. Trust comes from visible files, registry publication, and reproducible install checks,
              not from testimonials or promised outcomes.
            </p>
          </div>
          <div className="ledger-table" role="table" aria-label="Validation facts">
            <div role="row">
              <span role="cell">Registry</span>
              <strong role="cell">Both slugs resolve through `clawhub inspect` and search.</strong>
            </div>
            <div role="row">
              <span role="cell">OpenClaw install</span>
              <strong role="cell">Both install into an isolated profile and report model-visible command availability.</strong>
            </div>
            <div role="row">
              <span role="cell">Runtime</span>
              <strong role="cell">Each skill has a smoke-test receipt and expected output sections.</strong>
            </div>
            <div role="row">
              <span role="cell">Safety boundary</span>
              <strong role="cell">No copied paid prompts, fake endorsements, hidden affiliate claims, or bypass workflows.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section source-section">
        <div className="container source-grid">
          <div>
            <p className="section-kicker">Open source surface</p>
            <h2>Every claim points to a file.</h2>
          </div>
          <div className="receipt-list">
            <a href={publicationReceiptUrl}>ClawHub publication and install receipt</a>
            <a href={`${repoUrl}/tree/main/proof-cards`}>Proof cards and runtime smoke receipts</a>
            <a href={`${repoUrl}/blob/main/DESIGN.md`}>DESIGN.md rules for this page</a>
            <a href={releaseUrl}>GitHub release ZIP</a>
            <a href={feedbackUrl}>First-user feedback issue</a>
          </div>
        </div>
      </section>

      <section className="section updates-section" id="updates">
        <div className="container updates-grid">
          <div>
            <p className="section-kicker">Updates</p>
            <h2>Email only when the pack changes.</h2>
            <p className="section-intro">
              Subscribe for release notes, validation failures, install guide fixes, or hard-gate decisions. No daily drip and no paid upsell
              until there is external install/use evidence.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </section>

      <section className="section next-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Next analysis queue</p>
            <h2>Candidate skills stay gated until they pass the same evidence review.</h2>
          </div>
          <div className="queue-grid">
            <article>
              <span>Safer next candidate</span>
              <h3>digital-product-preflight-planner</h3>
              <p>Validate personal knowledge, product promise, pre-sell copy, audience capture, and build/no-build criteria.</p>
            </article>
            <article>
              <span>High-risk candidate</span>
              <h3>fictional-character-safety-planner</h3>
              <p>Only viable with fictional identity disclosure, consent-cleared references, voice rights, platform risk notes, and a release gate.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Free MVP. Source, install receipts, and deployment notes are public.</span>
          <div>
            <a href={repoUrl}>GitHub</a>
            <a href={deployDocsUrl}>Email deploy notes</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
