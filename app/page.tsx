import SubscribeForm from "./subscribe-form";

const repoUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";
const releaseUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases/tag/v0.1.0";
const feedbackUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/issues/1";

export default function Home() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">Tutorial-to-Skill Free Pack</div>
          <nav className="nav" aria-label="Primary">
            <a href="#skills">Skills</a>
            <a href="#updates">Updates</a>
            <a href="#subscribe">Email updates</a>
            <a href={repoUrl}>GitHub</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">OpenClaw / Codex skill proof pack</div>
            <h1>Two tested skill folders, source notes, and receipts instead of prompt dumps.</h1>
            <p className="lead">
              A free MVP that turns public AI workflow tutorials into reviewable plain-text skills. It is built for
              testers who want installable artifacts, source boundaries, and runtime evidence before trusting a skill.
            </p>
            <div className="actions">
              <a className="button primary" href={releaseUrl}>Download v0.1.0</a>
              <a className="button secondary" href={feedbackUrl}>Report install result</a>
            </div>
          </div>

          <aside className="proof-panel" aria-label="Validation facts">
            <p className="proof-title">Validation facts</p>
            <ul className="proof-list">
              <li><span className="label">Skills</span><span>2 plain `SKILL.md` folders</span></li>
              <li><span className="label">Runtime</span><span>OpenClaw smoke receipts included</span></li>
              <li><span className="label">Security</span><span>No secrets, wallets, cookies, or shell commands inside skills</span></li>
              <li><span className="label">Paid gate</span><span>Blocked until real install/use data exists</span></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="container">
          <h2>Included skills</h2>
          <p className="section-intro">
            Each skill is a narrow workflow artifact with source notes and required output sections. The pack is meant to
            be inspected before install.
          </p>
          <div className="skill-grid">
            <article className="card">
              <h3>ai-video-scene-director</h3>
              <p>Plans low-waste AI video scenes with continuity, shot order, camera language, repair prompts, and credit-risk controls.</p>
              <ul>
                <li>Best for AI video creators testing product teasers or character continuity.</li>
                <li>Hard boundary: no fake endorsement or undisclosed impersonation workflows.</li>
              </ul>
            </article>
            <article className="card">
              <h3>affiliate-ugc-test-planner</h3>
              <p>Plans disclosure-safe affiliate UGC tests with hook matrices, briefs, platform plan, cost risk, metrics, and kill criteria.</p>
              <ul>
                <li>Best for low-budget organic tests before spending generation credits.</li>
                <li>Hard boundary: no income promise and no unsupported product claims.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="updates">
        <div className="container">
          <h2>Update policy</h2>
          <p className="section-intro">
            Updates are sent only to subscribed emails. Expect release notes for new proof cards, install fixes, and
            hard-gate decisions. No paid pack will be announced until there is external install/use evidence.
          </p>
          <div className="update-grid">
            <article className="card">
              <h3>What triggers an email</h3>
              <p>New skill release, validation failure fix, public install guide change, or a hard-gate decision that affects users.</p>
            </article>
            <article className="card">
              <h3>What does not</h3>
              <p>No daily marketing drip, no revenue claims, no creator-workflow copying, and no paid upsell without proof.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section subscribe-band" id="subscribe">
        <div className="container">
          <h2>Email me when the pack changes</h2>
          <p className="section-intro">
            Subscribe for release updates only. The backend stores opted-in emails in Vercel Marketplace Redis / Upstash
            and sends updates through Resend when the release webhook is called.
          </p>
          <SubscribeForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Install path</h2>
          <p className="section-intro">Clone the repo or download the release ZIP, inspect the files, then install into OpenClaw managed skills.</p>
          <pre className="code"><code>{`mkdir -p ~/.openclaw/skills
cp -R skills/ai-video-scene-director ~/.openclaw/skills/
cp -R skills/affiliate-ugc-test-planner ~/.openclaw/skills/
openclaw skills info`}</code></pre>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <span>Free MVP. Source and receipts are public on </span>
          <a href={repoUrl}>GitHub</a>
          <span>.</span>
        </div>
      </footer>
    </main>
  );
}
