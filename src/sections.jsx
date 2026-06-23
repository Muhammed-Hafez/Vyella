/* ============================================================================
   Vyella® — sections: Process, Trust, Stats, Press, FAQ, Instagram, Contact, Footer
   ========================================================================== */

const { useState } = React;
const { t, Icon, SocialIcons, Btn, SectionHead, Sticker } = window;

/* ---------------- PROCESS / STEPS ---------------- */
function Process({ lang }) {
  const p = window.VyellaContent.process;
  const icons = ["drop", "flame", "sparkle", "gift"];
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} align="center" lang={lang} />
        <div className="process__grid">
          {p.steps.map((st, i) => (
            <div className="process__step" key={i}>
              <div className="process__icon"><Icon name={icons[i]} size={30} /></div>
              <div className="process__no">{st.no}</div>
              <h3 className="process__name">{t(st.name, lang)}</h3>
              <p className="process__body">{t(st.body, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRUST / DELIVERY ---------------- */
function Trust({ lang }) {
  const tr = window.VyellaContent.trust;
  return (
    <section className="trust">
      <div className="wrap trust__grid">
        {tr.items.map((it, i) => (
          <div className="trust__item" key={i}>
            <div className="trust__icon"><Icon name={it.icon} size={26} /></div>
            <div className="trust__text">
              <div className="trust__title">{t(it.title, lang)}</div>
              <div className="trust__body">{t(it.body, lang)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- STATS / ACHIEVEMENTS ---------------- */
function Stats({ lang }) {
  const s = window.VyellaContent.stats;
  return (
    <section className="section stats" id="stats">
      <div className="wrap">
        <SectionHead eyebrow={s.eyebrow} title={s.title} align="center" lang={lang} tone="light" />
        <div className="stats__grid">
          {s.items.map((it, i) => (
            <div className="stats__cell" key={i}>
              <div className="stats__n">{it.n}</div>
              <div className="stats__label">{t(it.label, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRESS ---------------- */
function Press({ lang }) {
  const p = window.VyellaContent.press;
  return (
    <section className="press" id="press">
      <div className="wrap press__inner">
        <div className="press__eyebrow eyebrow">{t(p.eyebrow, lang)}</div>
        <div className="press__row">
          {p.outlets.map((o, i) => (
            <span className="press__outlet" key={i}>{t(o, lang)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ({ lang }) {
  const f = window.VyellaContent.faq;
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq__wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} align="center" lang={lang} />
        <div className="faq__list">
          {f.items.map((it, i) => (
            <div className={`faq__item ${open === i ? "is-open" : ""}`} key={i}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{t(it.q, lang)}</span>
                <span className="faq__icon"><Icon name={open === i ? "minus" : "plus"} size={20} /></span>
              </button>
              <div className="faq__a"><p>{t(it.a, lang)}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- INSTAGRAM ---------------- */
function Instagram({ lang }) {
  const ig = window.VyellaContent.ig;
  const imgs = [
    "assets/prod-croissant.png",
    "assets/prod-raspberry-cheesecake.png",
    "assets/prod-strawberry-cake.png",
    "assets/prod-tiramisu-parfait.png",
    "assets/prod-ube-parfait.png",
    "assets/prod-iced-coffee.png",
  ];
  return (
    <section className="section ig" id="instagram">
      <div className="wrap">
        <div className="ig__head">
          <div>
            <div className="eyebrow">{t(ig.eyebrow, lang)}</div>
            <h2 className="ig__title">{t(ig.title, lang)}</h2>
          </div>
          <div className="ig__right">
            <p className="ig__sub">{t(ig.sub, lang)}</p>
            <Btn as="a" href={window.VyellaContent.social.instagram} target="_blank" rel="noopener"
              variant="primary" size="md" icon="instagram">{t(ig.cta, lang)}</Btn>
          </div>
        </div>
        <div className="ig__grid">
          {imgs.map((src, i) => (
            <a className="ig__tile" key={i} href={window.VyellaContent.social.instagram} target="_blank" rel="noopener" aria-label="Instagram post">
              <image-slot id={`ig-${i}`} shape="rect" src={src} fit="contain"
                placeholder="ig" style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}></image-slot>
              <span className="ig__overlay"><Icon name="instagram" size={26} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact({ lang }) {
  const c = window.VyellaContent.contact;
  const s = window.VyellaContent.social;
  const waLink = "https://wa.me/" + c.phone.replace(/[^0-9]/g, "");
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} align="center" lang={lang} />
        <div className="contact__grid">
          <div className="contact__cards">
            <div className="c-card">
              <div className="c-card__icon"><Icon name="pin" size={22} /></div>
              <div className="c-card__label">{t(c.studioLabel, lang)}</div>
              <div className="c-card__line">{t(c.studio.l1, lang)}</div>
              <div className="c-card__line">{t(c.studio.l2, lang)}</div>
              <div className="c-card__muted">{t(c.studio.l3, lang)}</div>
            </div>
            <div className="c-card">
              <div className="c-card__icon"><Icon name="clock" size={22} /></div>
              <div className="c-card__label">{t(c.hoursLabel, lang)}</div>
              {c.hours.map((h, i) => (
                <div className="c-card__hours" key={i}><span>{t(h.d, lang)}</span><span>{t(h.t, lang)}</span></div>
              ))}
            </div>
            <div className="c-card">
              <div className="c-card__icon"><Icon name="phone" size={22} /></div>
              <div className="c-card__label">{t(c.phoneLabel, lang)}</div>
              <a className="c-card__big" href={`tel:${c.phone.replace(/\s/g, "")}`} dir="ltr">{c.phone}</a>
              <a className="c-card__wa" href={waLink} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={16} /> WhatsApp
              </a>
            </div>
            <div className="c-card">
              <div className="c-card__icon"><Icon name="mail" size={22} /></div>
              <div className="c-card__label">{t(c.emailLabel, lang)}</div>
              <a className="c-card__big c-card__email" href={`mailto:${c.email}`}>{c.email}</a>
              <div className="c-card__label" style={{ marginTop: 14 }}>{t(c.socialLabel, lang)}</div>
              <SocialIcons size={20} className="c-card__social" />
            </div>
          </div>

          <div className="contact__map">
            <StylizedMap />
            <div className="map-pin">
              <span className="map-pin__badge">{t(c.mapPin, lang)}</span>
              <span className="map-pin__dot" />
            </div>
            <div className="map-cap">{t(c.mapCaption, lang)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StylizedMap() {
  return (
    <svg viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="420" fill="var(--vy-paper)" />
      <rect x="20" y="20" width="160" height="120" fill="var(--tint-pink)" />
      <rect x="200" y="20" width="180" height="80" fill="var(--tint-butter)" />
      <rect x="220" y="240" width="160" height="160" fill="var(--tint-green)" />
      <rect x="20" y="280" width="180" height="120" fill="var(--tint-pink-2)" />
      <rect x="200" y="120" width="100" height="100" fill="var(--tint-cream)" />
      <rect x="20" y="160" width="160" height="100" fill="var(--tint-green-2)" />
      <rect x="320" y="120" width="60" height="100" fill="var(--tint-cream)" />
      <rect x="0" y="222" width="400" height="16" fill="var(--vy-cream-warm)" />
      <line x1="0" y1="230" x2="400" y2="230" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="8 8" />
      <rect x="192" y="0" width="16" height="420" fill="var(--vy-cream-warm)" />
      <line x1="200" y1="0" x2="200" y2="420" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="8 8" />
      <text x="40" y="50" fill="var(--fg-soft)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">DUBAI</text>
      <text x="230" y="50" fill="var(--fg-soft)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">ALL UAE</text>
      <text x="40" y="320" fill="var(--fg-soft)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">+ EGYPT</text>
    </svg>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ lang, go }) {
  const f = window.VyellaContent.footer;
  const nav = window.VyellaContent.nav;
  const c = window.VyellaContent.contact;
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <div className="footer__logo"><img className="footer__logo-img" src="assets/vyella-logo-cream.png" alt="Vyella" /></div>
          <p className="footer__tag">{t(f.tag, lang)}</p>
          <p className="footer__blurb">{t(f.blurb, lang)}</p>
          <SocialIcons size={22} className="footer__social" />
        </div>
        <div className="footer__col">
          <div className="footer__col-title">{t(f.colShop, lang)}</div>
          <a href="#/shop" onClick={(e) => { e.preventDefault(); go("#/shop"); }}>{t(nav.shop, lang)}</a>
          <a href="#/customise" onClick={(e) => { e.preventDefault(); go("#/customise"); }}>{t(nav.custom, lang)}</a>
          <a href="#process" onClick={(e) => { e.preventDefault(); go("#process"); }}>{t(nav.process, lang)}</a>
        </div>
        <div className="footer__col">
          <div className="footer__col-title">{t(f.colStudio, lang)}</div>
          <a href="#about" onClick={(e) => { e.preventDefault(); go("#about"); }}>{t(nav.about, lang)}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); go("#contact"); }}>{t(nav.contact, lang)}</a>
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} dir="ltr">{c.phone}</a>
          <a href={`mailto:${c.email}`}>{c.email}</a>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>{t(f.rights, lang)}</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Process, Trust, Stats, Press, FAQ, Instagram, Contact, StylizedMap, Footer });
