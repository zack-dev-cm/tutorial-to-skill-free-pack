import SubscribeForm from "./subscribe-form";

const repoUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";
const releaseUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases/tag/v0.1.0";
const feedbackUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/issues/1";
const deployDocsUrl = "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/blob/main/docs/vercel-email-deploy.md";

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
            <h1>Open skill design with receipts, update email, and no hidden automation.</h1>
            <p className="lead">
              A free MVP that turns public AI workflow tutorials into reviewable plain-text skills. The landing page,
              design system, source notes, runtime receipts, and email update logic are all public.
            </p>
            <div className="actions">
              <a className="button primary" href="#install">Install from ClawHub</a>
              <a className="button secondary" href={releaseUrl}>Download v0.1.0</a>
              <a className="button secondary" href={feedbackUrl}>Report install result</a>
            </div>
          </div>

          <aside className="proof-panel" aria-label="Validation facts">
            <p className="proof-title">Validation facts</p>
            <ul className="proof-list">
              <li><span className="label">Source</span><span>MIT-0 repo, plain files, inspectable scripts</span></li>
              <li><span className="label">Registry</span><span>Two skills published on ClawHub as v0.1.0</span></li>
              <li><span className="label">Runtime</span><span>Smoke-test receipts and required output gates</span></li>
              <li><span className="label">Updates</span><span>Email only after opt-in; unsubscribe link in every send</span></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="status-strip" aria-label="Release status">
        <div className="container status-grid">
          <div><strong>v0.1.0</strong><span>Free release</span></div>
          <div><strong>2</strong><span>ClawHub skills</span></div>
          <div><strong>2</strong><span>Runtime receipts</span></div>
          <div><strong>100</strong><span>Touch shutdown gate</span></div>
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

      <section className="section open-design">
        <div className="container open-grid">
          <div>
            <h2>Open design, not a black-box funnel</h2>
            <p className="section-intro">
              The page is designed around public evidence. Every trust claim should resolve to a file, receipt, issue,
              release, or explicit boundary.
            </p>
          </div>
          <div className="receipt-list">
            <a href={`${repoUrl}/blob/main/DESIGN.md`}>DESIGN.md tokens and rules</a>
            <a href={`${repoUrl}/tree/main/proof-cards`}>Proof cards and smoke receipts</a>
            <a href={deployDocsUrl}>Vercel email deployment notes</a>
            <a href={feedbackUrl}>First-user feedback issue</a>
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
          <h2>Next analysis queue</h2>
          <p className="section-intro">
            Two new channels were reviewed. The ebook/Claude workflow is the next safer free-skill candidate; the AI
            influencer workflow is high-signal but needs identity, consent, and disclosure gates before any conversion.
          </p>
          <div className="update-grid">
            <article className="card">
              <h3>digital-product-preflight-planner</h3>
              <p>Candidate skill for validating personal knowledge, product promise, pre-sell copy, audience capture, and build/no-build criteria.</p>
            </article>
            <article className="card warning">
              <h3>fictional-character-safety-planner</h3>
              <p>Only safe if it requires fictional identity disclosure, consent-cleared references, voice rights, platform risk notes, and a release gate.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Install path</h2>
          <p className="section-intro">
            Install through ClawHub first. If the registry is unavailable, clone the repo or download the release ZIP,
            inspect the files, then use the manual fallback.
          </p>
          <pre className="code" id="install"><code>{`openclaw skills install ai-video-scene-director
openclaw skills install affiliate-ugc-test-planner
openclaw skills info`}</code></pre>
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
