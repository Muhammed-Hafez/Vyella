/* ============================================================================
   Vyella® — app shell: announcement, nav + utility bar, hash router, mount
   ========================================================================== */

const { useState, useEffect, useCallback, useRef } = React;
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
  ShopPage,
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

/* ---- utility dropdown (currency / language) ---- */
function UtilitySelect({
  value,
  options,
  onChange,
  ariaLabel,
  icon,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const label = selected?.label ?? value;

  return (
    <div
      className={`util-select ${icon ? "util-select--icon" : ""} ${open ? "is-open" : ""} ${className}`}
      ref={ref}
    >
      <button
        type="button"
        className="util-select__trigger"
        aria-label={`${ariaLabel}: ${label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {icon ? (
          <Icon name={icon} size={17} />
        ) : (
          <>
            <span className="util-select__value">{label}</span>
            <span className="util-select__caret" aria-hidden="true" />
          </>
        )}
      </button>
      {open && (
        <ul className="util-select__menu" role="listbox" aria-label={ariaLabel}>
          {options.map((opt) => (
            <li key={opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={`util-select__option ${value === opt.value ? "is-active" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---- currency auto-detection (first visit only) ---- */
async function detectDefaultCurrency() {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.country_code === "EG") return "EGP";
      if (data.country_code === "AE") return "AED";
    }
  } catch (_) {}

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Africa/Cairo") return "EGP";
    if (tz === "Asia/Dubai") return "AED";
  } catch (_) {}

  const locales = [navigator.language, ...(navigator.languages || [])];
  for (const loc of locales) {
    const region = loc.split("-")[1]?.toUpperCase();
    if (region === "EG") return "EGP";
    if (region === "AE") return "AED";
  }

  return "AED";
}

/* ---- top bar (announcement + nav + utility) ---- */
function TopBar({ lang, setLang, cur, setCur, go }) {
  const C = window.VyellaContent;
  const [mobile, setMobile] = useState(false);
  const currencies = ["AED", "USD", "EGP"];
  const languages = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ];

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
            <UtilitySelect
              value={cur}
              options={currencies.map((x) => ({ value: x, label: x }))}
              onChange={setCur}
              ariaLabel="Currency"
              icon="currency"
              className="util-select--cur"
            />
            <UtilitySelect
              value={lang}
              options={languages}
              onChange={setLang}
              ariaLabel="Language"
              icon="globe"
              className="util-select--lang"
            />
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
      <Products lang={lang} cur={cur} go={go} isHomePreview />
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
  const [lang, setLangState] = useState(
    () => localStorage.getItem("vy-lang") || "en",
  );
  const [cur, setCurState] = useState(
    () => localStorage.getItem("vy-cur") || "AED",
  );
  const [dir, setDir] = useState(() => localStorage.getItem("vy-dir") || "b");
  const hash = useHashRoute();

  const setLang = useCallback((value) => {
    setLangState(value);
    localStorage.setItem("vy-lang", value);
  }, []);

  const setCur = useCallback((value) => {
    setCurState(value);
    localStorage.setItem("vy-cur", value);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("vy-cur")) return;

    let cancelled = false;
    detectDefaultCurrency().then((detected) => {
      if (cancelled || localStorage.getItem("vy-cur")) return;
      setCur(detected);
    });

    return () => {
      cancelled = true;
    };
  }, [setCur]);

  useEffect(() => {
    document.documentElement.dataset.dir = dir;
    localStorage.setItem("vy-dir", dir);
  }, [dir]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

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
    view = <ShopPage lang={lang} cur={cur} go={go} />;
  } else {
    view = <Home lang={lang} cur={cur} go={go} />;
  }

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
