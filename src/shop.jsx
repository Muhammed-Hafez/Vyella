/* ============================================================================
   Vyella® — shop module: product grid, filtering, cards, customise banner
   Fully isolated from home sections (Hero, About, etc.)
   ========================================================================== */

const { useState, useMemo, useEffect } = React;
const { t, Icon, Btn, SectionHead, Sticker, Price } = window;

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

const SHOP_TABS = ["newArrivals", "bestSellers", "byScent"];
const SCENT_FAMILIES = ["all", "sweet", "warm", "fruity", "rich"];

function filterProducts(tab, family, products) {
  if (tab === "newArrivals")
    return products.filter((p) => p.flags.includes("new"));
  if (tab === "bestSellers")
    return products.filter((p) => p.flags.includes("bestseller"));
  return family === "all"
    ? products
    : products.filter((p) => p.family === family);
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

/* ---------------- SHOP SECTION ---------------- */
function Products({ lang, cur, go, isHomePreview = false }) {
  const s = window.VyellaContent.shop;
  const all = window.VyellaContent.products;
  const [tab, setTab] = useState("newArrivals");
  const [family, setFamily] = useState("all");

  const list = useMemo(
    () => filterProducts(tab, family, all),
    [tab, family, all],
  );

  const tabs = SHOP_TABS.map((key) => [key, s.tabs[key]]);

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
            {SCENT_FAMILIES.map((f) => (
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
              if (isHomePreview) go("#/shop");
              else {
                setTab("byScent");
                setFamily("all");
              }
            }}
          >
            {t(window.VyellaContent.ui.shopAll, lang)}
          </Btn>
        </div>
      </div>

      <CustomBanner lang={lang} go={go} />
    </section>
  );
}

/* ---------------- SHOP PAGE ---------------- */
function ShopPage({ lang, cur, go }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Products lang={lang} cur={cur} go={go} />;
}

Object.assign(window, {
  Products,
  ProductCard,
  CustomBanner,
  ShopPage,
  filterProducts,
  PROD_POS,
});
