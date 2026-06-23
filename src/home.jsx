/* ============================================================================
   Vyella® — home: Hero, About, Products (tabs + customise)
   ========================================================================== */

const { useState, useEffect, useMemo } = React;
const { t, formatPrice, Icon, SocialIcons, Btn, SectionHead, Sticker, Price } =
  window;

const PROD_POS = [
  "34% 72%",
  "72% 28%",
  "30% 82%",
  "80% 22%",
  "44% 66%",
  "66% 34%",
  "32% 78%",
  "76% 24%",
];

/* ---------------- HERO ---------------- */
function Hero({ lang, cur, go }) {
  const h = window.VyellaContent.hero;
  return (
    <header className="hero" id="top">
      <div className="wrap hero__inner">
        <div className="hero__badge eyebrow">EST. 2026 · DUBAI, UAE</div>

        <h1 className="hero__logo">
          <img
            className="hero__logo-img"
            src="assets/vyella-logo.png"
            alt="Vyella"
          />
        </h1>

        <p className="hero__slogan">
          <span className="s1">{t(h.slogan1, lang)}</span> <br></br>
          <span className="s2">{t(h.slogan2, lang)}</span>
        </p>

        <p className="hero__sub">{t(h.sub, lang)}</p>

        <div className="hero__ctas">
          <Btn
            as="button"
            variant="primary"
            size="lg"
            iconRight="arrow"
            onClick={() => go("#/shop")}
          >
            {t(h.ctaShop, lang)}
          </Btn>
          <Btn
            as="button"
            variant="outline"
            size="lg"
            iconRight="sparkle"
            onClick={() => go("#/customise")}
          >
            {t(h.ctaCustom, lang)}
          </Btn>
        </div>

        <div className="hero__photo">
          <image-slot
            id="hero-main"
            shape="rect"
            src="assets/hero-berry-bliss.jpg"
            fit="cover"
            position="50% 45%"
            placeholder={lang === "en" ? "drop a hero photo" : "اسحبي صورة"}
            style={{ width: "100%", height: "100%", display: "block" }}
          ></image-slot>
          <Sticker
            variant="green"
            shape="round"
            rot={-10}
            className="hero__st hero__st--1"
          >
            <span>{lang === "en" ? "soy wax" : "شمع صويا"}</span>
          </Sticker>
          <Sticker
            variant="cream"
            shape="pill"
            rot={6}
            className="hero__st hero__st--2"
          >
            {lang === "en" ? "hand poured" : "صبّ يدوي"}
          </Sticker>
        </div>
      </div>
    </header>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ lang }) {
  const a = window.VyellaContent.about;
  return (
    <section className="section about" id="about">
      <div className="wrap about__grid">
        <div className="about__media">
          <image-slot
            id="about-studio"
            shape="rect"
            src="assets/about-waffle.jpg"
            fit="cover"
            position="50% 50%"
            placeholder={lang === "en" ? "drop a studio photo" : "اسحبي صورة"}
            style={{ width: "100%", height: "100%", display: "block" }}
          ></image-slot>
          <Sticker variant="pink" shape="round" rot={-8} className="about__st">
            <span>{lang === "en" ? "made by\nhand" : "بالإيد\nبالكامل"}</span>
          </Sticker>
        </div>
        <div className="about__body">
          <div className="eyebrow">{t(a.eyebrow, lang)}</div>
          <h2 className="about__title">{t(a.title, lang)}</h2>
          <p className="about__text">{t(a.body, lang)}</p>
          <Btn as="a" href="#process" variant="ink" size="md" iconRight="arrow">
            {t(a.cta, lang)}
          </Btn>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRODUCT CARD ---------------- */
function ProductCard({ p, idx, lang, cur, go }) {
  const isNew = p.flags.includes("new");
  const isBest = p.flags.includes("bestseller");
  return (
    <article
      className="card"
      onClick={() => go(`#/candle/${p.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") go(`#/candle/${p.id}`);
      }}
    >
      <div className="card__media">
        <image-slot
          id={`prod-${p.id}`}
          shape="rect"
          src={p.img}
          fit="contain"
          placeholder={t(p.name, lang)}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
        ></image-slot>
        {isNew && (
          <Sticker variant="lime" shape="pill" rot={-5} className="card__flag">
            {lang === "en" ? "new" : "جديد"}
          </Sticker>
        )}
        {isBest && !isNew && (
          <Sticker variant="tang" shape="pill" rot={-5} className="card__flag">
            {lang === "en" ? "bestseller" : "الأكثر مبيعاً"}
          </Sticker>
        )}
      </div>
      <div className="card__body">
        <div className="card__row">
          <h3 className="card__name">{t(p.name, lang)}</h3>
          <div className="card__price">
            <Price aed={p.base} cur={cur} lang={lang} />
          </div>
        </div>
        <p className="card__scent">{t(p.scent, lang)}</p>
        <span className="card__cta">
          {t(window.VyellaContent.ui.viewDetails, lang)}{" "}
          <Icon name="arrow" size={15} />
        </span>
      </div>
    </article>
  );
}

/* ---------------- PRODUCTS SECTION ---------------- */
function Products({ lang, cur, go }) {
  const s = window.VyellaContent.shop;
  const all = window.VyellaContent.products;
  const [tab, setTab] = useState("newArrivals");
  const [family, setFamily] = useState("all");

  const list = useMemo(() => {
    if (tab === "newArrivals")
      return all.filter((p) => p.flags.includes("new"));
    if (tab === "bestSellers")
      return all.filter((p) => p.flags.includes("bestseller"));
    // by scent
    return family === "all" ? all : all.filter((p) => p.family === family);
  }, [tab, family, all]);

  const tabs = [
    ["newArrivals", s.tabs.newArrivals],
    ["bestSellers", s.tabs.bestSellers],
    ["byScent", s.tabs.byScent],
  ];
  const fams = ["all", "sweet", "warm", "fruity", "rich"];

  return (
    <section className="section shop" id="shop">
      <div className="wrap">
        <SectionHead
          eyebrow={s.eyebrow}
          title={s.title}
          align="center"
          lang={lang}
        />

        <div className="shop__tabs" role="tablist">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`shop__tab ${tab === key ? "is-active" : ""}`}
              onClick={() => setTab(key)}
            >
              {t(label, lang)}
            </button>
          ))}
        </div>

        {tab === "byScent" && (
          <div className="shop__fams">
            {fams.map((f) => (
              <button
                key={f}
                className={`chip ${family === f ? "is-active" : ""}`}
                onClick={() => setFamily(f)}
              >
                {t(s.scentFamilies[f], lang)}
              </button>
            ))}
          </div>
        )}

        <div className="shop__grid">
          {list.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              idx={all.indexOf(p)}
              lang={lang}
              cur={cur}
              go={go}
            />
          ))}
        </div>

        <div className="shop__all">
          <Btn
            as="button"
            variant="ink"
            size="md"
            iconRight="arrow"
            onClick={() => {
              setTab("byScent");
              setFamily("all");
            }}
          >
            {t(window.VyellaContent.ui.shopAll, lang)}
          </Btn>
        </div>
      </div>

      {/* customise banner */}
      <CustomBanner lang={lang} go={go} />
    </section>
  );
}

/* ---------------- CUSTOMISE BANNER ---------------- */
function CustomBanner({ lang, go }) {
  const cb = window.VyellaContent.shop.customBanner;
  const cz = window.VyellaContent.customize;
  return (
    <div className="wrap" id="customise">
      <div className="custom">
        <div className="custom__intro">
          <div className="eyebrow">{t(cb.eyebrow, lang)}</div>
          <h3 className="custom__title">{t(cb.title, lang)}</h3>
          <p className="custom__body">{t(cb.body, lang)}</p>
          <Btn
            as="button"
            variant="primary"
            size="lg"
            iconRight="arrow"
            onClick={() => go("#/customise")}
          >
            {t(cb.cta, lang)}
          </Btn>
        </div>
        <div className="custom__steps">
          {cz.steps.map((st, i) => (
            <div className="custom__step" key={i}>
              <span className="custom__no">{st.no}</span>
              <div>
                <div className="custom__step-label">{t(st.label, lang)}</div>
                <div className="custom__step-body">{t(st.body, lang)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Hero,
  About,
  Products,
  ProductCard,
  CustomBanner,
  PROD_POS,
});
