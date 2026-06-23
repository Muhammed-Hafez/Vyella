/* ============================================================================
   Vyella® — app shell: announcement, nav + utility bar, hash router, mount
   ========================================================================== */

const { useState, useEffect, useCallback } = React;
const { t, Icon, Btn, SocialIcons } = window;
const {
  Hero,
  About,
  Products,
  Process,
  Trust,
  Stats,
  Press,
  FAQ,
  Instagram,
  Contact,
  Footer,
  ProductPage,
  CustomisePage,
} = window;

/* ---- marquee ---- */
function Marquee({ text }) {
  const items = Array.from({ length: 6 }, (_, i) => (
    <span key={i}>{text}</span>
  ));
  return (
    <div className="announce__track">
      {items}
      {items}
    </div>
  );
}

/* ---- hash routing ---- */
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const on = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

/* ---- top bar (announcement + nav + utility) ---- */
function TopBar({ lang, setLang, cur, setCur, go }) {
  const C = window.VyellaContent;
  const [mobile, setMobile] = useState(false);
  const currencies = ["AED", "USD", "EGP"];

  const navTo = (target) => {
    setMobile(false);
    go(target);
  };

  return (
    <div className="topbar">
      {/* announcement */}
      <div className="announce">
        <Marquee text={t(C.announce, lang)} />
      </div>

      {/* utility bar — full width, spread */}
      <div className="utility">
        <div className="wrap-wide utility__inner">
          <div className="utility__side utility__left">
            <SocialIcons size={17} />
          </div>
          <div className="utility__center">{t(C.footer.blurb, lang)}</div>
          <div className="utility__side utility__right">
            <div className="cur-switch" role="group" aria-label="currency">
              {currencies.map((x) => (
                <button
                  key={x}
                  className={`cur-switch__btn ${cur === x ? "is-active" : ""}`}
                  onClick={() => setCur(x)}
                >
                  {x}
                </button>
              ))}
            </div>
            <button
              className="lang-btn"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
            >
              {t(C.ui.langSwitch, lang)}
            </button>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav className="nav">
        <div className="wrap-wide nav__inner">
          <button
            className="nav__burger"
            onClick={() => setMobile(!mobile)}
            aria-label="menu"
          >
            <Icon name={mobile ? "close" : "menu"} size={24} />
          </button>
          <a
            className="nav__logo"
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navTo("#/");
            }}
            aria-label="Vyella home"
          >
            <img
              className="nav__logo-img"
              src="assets/vyella-logo.png"
              alt="Vyella"
            />
          </a>
          <ul className={`nav__links ${mobile ? "is-open" : ""}`}>
            <li>
              <a
                href="#/shop"
                onClick={(e) => {
                  e.preventDefault();
                  navTo("#/shop");
                }}
              >
                {t(C.nav.shop, lang)}
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navTo("#about");
                }}
              >
                {t(C.nav.about, lang)}
              </a>
            </li>
            <li>
              <a
                href="#/customise"
                onClick={(e) => {
                  e.preventDefault();
                  navTo("#/customise");
                }}
              >
                {t(C.nav.custom, lang)}
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  navTo("#process");
                }}
              >
                {t(C.nav.process, lang)}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navTo("#contact");
                }}
              >
                {t(C.nav.contact, lang)}
              </a>
            </li>
          </ul>
          <Btn
            as="button"
            variant="primary"
            size="sm"
            className="nav__cta"
            onClick={() => navTo("#/shop")}
          >
            {t(C.ui.reserve, lang)}
          </Btn>
        </div>
      </nav>
    </div>
  );
}

/* ---- direction switcher (floating A/B) ---- */
function DirSwitch({ dir, setDir, lang }) {
  const labels = {
    a: { en: "studio", ar: "ستوديو" },
    b: { en: "patisserie", ar: "باتيسري" },
  };
  return (
    <div className="dirswitch" role="group" aria-label="design direction">
      <span className="dirswitch__label">
        {lang === "en" ? "look" : "الستايل"}
      </span>
      {["a", "b"].map((d) => (
        <button
          key={d}
          className={`dirswitch__btn ${dir === d ? "is-active" : ""}`}
          onClick={() => setDir(d)}
        >
          {t(labels[d], lang)}
        </button>
      ))}
    </div>
  );
}

/* ---- home composition ---- */
function Home({ lang, cur, go }) {
  return (
    <>
      <Hero lang={lang} cur={cur} go={go} />
      <Trust lang={lang} />
      <About lang={lang} />
      <Products lang={lang} cur={cur} go={go} />
      <Process lang={lang} />
      <Stats lang={lang} />
      <Press lang={lang} />
      <FAQ lang={lang} />
      <Instagram lang={lang} />
      <Contact lang={lang} />
    </>
  );
}

/* ---- app ---- */
function App() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("vy-lang") || "en",
  );
  const [cur, setCur] = useState(() => localStorage.getItem("vy-cur") || "AED");
  const [dir, setDir] = useState(() => localStorage.getItem("vy-dir") || "b");
  const hash = useHashRoute();

  useEffect(() => {
    document.documentElement.dataset.dir = dir;
    localStorage.setItem("vy-dir", dir);
  }, [dir]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("vy-lang", lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("vy-cur", cur);
  }, [cur]);

  // navigation helper: routes start with #/, in-page anchors are #section
  const go = useCallback((target) => {
    if (target.startsWith("#/")) {
      if (window.location.hash === target) window.scrollTo(0, 0);
      else window.location.hash = target;
      window.scrollTo(0, 0);
    } else {
      // in-page anchor — make sure we're on home first
      if (
        window.location.hash.startsWith("#/") &&
        window.location.hash !== "#/"
      ) {
        window.location.hash = "#/";
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 80);
      } else {
        const el = document.querySelector(target);
        if (el)
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth",
          });
      }
    }
  }, []);

  // route resolution
  let view;
  if (hash.startsWith("#/candle/")) {
    const id = hash.replace("#/candle/", "");
    view = <ProductPage id={id} lang={lang} cur={cur} go={go} />;
  } else if (hash === "#/customise") {
    view = <CustomisePage lang={lang} cur={cur} go={go} />;
  } else if (hash === "#/shop") {
    view = <Home lang={lang} cur={cur} go={go} />;
    // scroll to shop after mount
  } else {
    view = <Home lang={lang} cur={cur} go={go} />;
  }

  // when navigating to #/shop, scroll to the shop section
  useEffect(() => {
    if (hash === "#/shop") {
      setTimeout(() => {
        const el = document.getElementById("shop");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  }, [hash]);

  return (
    <>
      <TopBar lang={lang} setLang={setLang} cur={cur} setCur={setCur} go={go} />
      {view}
      <Footer lang={lang} go={go} />
      <DirSwitch dir={dir} setDir={setDir} lang={lang} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
