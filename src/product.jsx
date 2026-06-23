/* ============================================================================
   Vyella® — Product detail page + Customise page
   ========================================================================== */

const { useState, useEffect, useMemo } = React;
const { t, formatPrice, Icon, SocialIcons, Btn, SectionHead, Sticker, Price, ProductCard, PROD_POS } = window;

/* ---------------- PRODUCT DETAIL ---------------- */
function ProductPage({ id, lang, cur, go }) {
  const C = window.VyellaContent;
  const d = C.detail;
  const all = C.products;
  const p = all.find(x => x.id === id);
  const idx = all.findIndex(x => x.id === id);

  const [sizeKey, setSizeKey] = useState("classic");
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setSizeKey("classic"); setQty(1); setCustom(false); }, [id]);

  if (!p) {
    return (
      <div className="wrap" style={{ padding: "120px 0", textAlign: "center" }}>
        <h2>Not found</h2>
        <Btn as="button" variant="primary" onClick={() => go("#/shop")}>{t(C.ui.shopAll, lang)}</Btn>
      </div>
    );
  }

  const size = C.sizes.find(s => s.key === sizeKey);
  const unitPrice = p.base + size.delta;
  const total = unitPrice * qty;

  const related = all.filter(x => x.id !== id && x.family === p.family).slice(0, 3);
  const relatedFill = related.length < 3 ? related.concat(all.filter(x => x.id !== id && !related.includes(x)).slice(0, 3 - related.length)) : related;

  const waMsg = encodeURIComponent(
    (lang === "en"
      ? `Hi Vyella! I'd like to reserve: ${t(p.name, "en")} (${t(size.label, "en")} / ${size.oz}) ×${qty}${custom ? " — customised" : ""}.`
      : `أهلاً فييلا! حابة أحجز: ${t(p.name, "ar")} (${t(size.label, "ar")} / ${size.oz}) ×${qty}${custom ? " — مخصّصة" : ""}.`)
  );
  const waLink = "https://wa.me/" + C.contact.phone.replace(/[^0-9]/g, "") + "?text=" + waMsg;

  return (
    <main className="pdp">
      <div className="wrap pdp__back">
        <button className="pdp__back-btn" onClick={() => go("#/shop")}>
          <Icon name="arrowBack" size={18} /> {t(C.ui.back, lang)}
        </button>
      </div>

      <div className="wrap pdp__grid">
        {/* media */}
        <div className="pdp__media">
          <div className="pdp__photo">
            <image-slot id={`pdp-${p.id}`} shape="rect" src={p.img}
              fit="contain"
              placeholder={t(p.name, lang)}
              style={{ width: "100%", height: "100%", display: "block" }}></image-slot>
            {p.flags.includes("new") && <Sticker variant="lime" shape="pill" rot={-6} className="pdp__flag">{lang === "en" ? "new" : "جديد"}</Sticker>}
            {p.flags.includes("bestseller") && !p.flags.includes("new") && <Sticker variant="tang" shape="pill" rot={-6} className="pdp__flag">{lang === "en" ? "bestseller" : "الأكثر مبيعاً"}</Sticker>}
          </div>
          <div className="pdp__trust">
            <span><Icon name="hand" size={18} /> {t(d.trust1, lang)}</span>
            <span><Icon name="truck" size={18} /> {t(d.trust2, lang)}</span>
            <span><Icon name="leaf" size={18} /> {t(d.trust3, lang)}</span>
          </div>
        </div>

        {/* info */}
        <div className="pdp__info">
          <div className="eyebrow pdp__fam">{t(C.shop.scentFamilies[p.family], lang)}</div>
          <h1 className="pdp__name">{t(p.name, lang)}</h1>
          <p className="pdp__scent">{t(p.scent, lang)}</p>
          <div className="pdp__price">{formatPrice(unitPrice, cur, lang)}</div>

          <p className="pdp__desc">{t(p.desc, lang)}</p>

          {/* scent notes */}
          <div className="pdp__notes">
            <div className="pdp__sub-label">{t(d.scentNotes, lang)}</div>
            <div className="pdp__notes-row">
              {["top", "heart", "base"].map(k => (
                <div className="pdp__note" key={k}>
                  <span className="pdp__note-k">{t(d[k], lang)}</span>
                  <span className="pdp__note-v">{t(p.notes[k], lang)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* size */}
          <div className="pdp__block">
            <div className="pdp__sub-label">{t(d.chooseSize, lang)}</div>
            <div className="pdp__sizes">
              {C.sizes.map(s => (
                <button key={s.key} className={`pdp__size ${sizeKey === s.key ? "is-active" : ""}`} onClick={() => setSizeKey(s.key)}>
                  <span className="pdp__size-name">{t(s.label, lang)}</span>
                  <span className="pdp__size-meta">{s.oz} · {s.hrs} {t(d.perHrs, lang)}</span>
                  <span className="pdp__size-price">{formatPrice(p.base + s.delta, cur, lang)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* qty + reserve */}
          <div className="pdp__buy">
            <div className="pdp__qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="decrease"><Icon name="minus" size={18} /></button>
              <span>{lang === "ar" ? qty.toLocaleString("ar-EG") : qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="increase"><Icon name="plus" size={18} /></button>
            </div>
            <a className="btn btn--primary btn--lg pdp__reserve" href={waLink} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={20} />
              <span>{t(d.reserve, lang)} · {formatPrice(total, cur, lang)}</span>
            </a>
          </div>
          <p className="pdp__reserve-note">{t(d.reserveNote, lang)}</p>

          {/* customise toggle */}
          <div className={`pdp__custom ${custom ? "is-on" : ""}`}>
            <button className="pdp__custom-toggle" onClick={() => setCustom(!custom)}>
              <span className="pdp__custom-check">{custom && <Icon name="check" size={15} />}</span>
              <span>{t(d.customizeToggle, lang)}</span>
              <Icon name="sparkle" size={16} />
            </button>
            {custom && <p className="pdp__custom-hint">{t(d.customizeHint, lang)}</p>}
          </div>
        </div>
      </div>

      {/* related */}
      <div className="wrap pdp__related">
        <h2 className="pdp__related-title">{t(d.youMayLike, lang)}</h2>
        <div className="shop__grid">
          {relatedFill.map((rp) => (
            <ProductCard key={rp.id} p={rp} idx={all.indexOf(rp)} lang={lang} cur={cur} go={go} />
          ))}
        </div>
      </div>
    </main>
  );
}

/* ---------------- CUSTOMISE PAGE ---------------- */
function CustomisePage({ lang, cur, go }) {
  const C = window.VyellaContent;
  const cz = C.customize;
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [size, setSize] = useState("classic");
  const [scent, setScent] = useState(null);
  const [look, setLook] = useState(null);

  const scents = ["sweet", "warm", "fruity", "rich"];
  const looks = [
    { key: "as-shown", label: { en: "classic dessert", ar: "ديزرت كلاسيك" } },
    { key: "minimal", label: { en: "minimal & soft", ar: "بسيط وناعم" } },
    { key: "bold", label: { en: "bold & colourful", ar: "جريء وملوّن" } },
    { key: "surprise", label: { en: "surprise me", ar: "فاجئيني" } },
  ];

  const base = 50;
  const sz = C.sizes.find(s => s.key === size);
  const est = base + sz.delta;

  const waMsg = encodeURIComponent(
    lang === "en"
      ? `Hi Vyella! Custom candle: size ${t(sz.label, "en")} (${sz.oz}), scent ${scent ? t(C.shop.scentFamilies[scent], "en") : "TBD"}, look ${look ? t(looks.find(l => l.key === look).label, "en") : "TBD"}.`
      : `أهلاً فييلا! شمعة مخصّصة: الحجم ${t(sz.label, "ar")} (${sz.oz})، الريحة ${scent ? t(C.shop.scentFamilies[scent], "ar") : "هتتحدد"}، الشكل ${look ? t(looks.find(l => l.key === look).label, "ar") : "هيتحدد"}.`
  );
  const waLink = "https://wa.me/" + C.contact.phone.replace(/[^0-9]/g, "") + "?text=" + waMsg;

  return (
    <main className="custom-page">
      <div className="wrap pdp__back">
        <button className="pdp__back-btn" onClick={() => go("#/shop")}>
          <Icon name="arrowBack" size={18} /> {t(C.ui.back, lang)}
        </button>
      </div>
      <div className="wrap">
        <SectionHead eyebrow={cz.eyebrow} title={cz.title} sub={cz.sub} align="center" lang={lang} />

        <div className="cz">
          {/* step 1 size */}
          <div className="cz__step">
            <div className="cz__head"><span className="cz__no">01</span><h3>{t(cz.steps[0].label, lang)}</h3></div>
            <div className="cz__opts">
              {C.sizes.map(s => (
                <button key={s.key} className={`cz__opt ${size === s.key ? "is-active" : ""}`} onClick={() => setSize(s.key)}>
                  <span className="cz__opt-name">{t(s.label, lang)}</span>
                  <span className="cz__opt-meta">{s.oz} · {s.hrs} {t(C.detail.perHrs, lang)}</span>
                </button>
              ))}
            </div>
          </div>
          {/* step 2 scent */}
          <div className="cz__step">
            <div className="cz__head"><span className="cz__no">02</span><h3>{t(cz.steps[1].label, lang)}</h3></div>
            <div className="cz__opts cz__opts--scent">
              {scents.map(s => (
                <button key={s} className={`cz__opt ${scent === s ? "is-active" : ""}`} onClick={() => setScent(s)}>
                  <span className="cz__opt-name">{t(C.shop.scentFamilies[s], lang)}</span>
                </button>
              ))}
            </div>
          </div>
          {/* step 3 look */}
          <div className="cz__step">
            <div className="cz__head"><span className="cz__no">03</span><h3>{t(cz.steps[2].label, lang)}</h3></div>
            <div className="cz__opts cz__opts--scent">
              {looks.map(l => (
                <button key={l.key} className={`cz__opt ${look === l.key ? "is-active" : ""}`} onClick={() => setLook(l.key)}>
                  <span className="cz__opt-name">{t(l.label, lang)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* summary */}
          <div className="cz__summary">
            <div className="cz__est">
              <span className="cz__est-label">{lang === "en" ? "estimated from" : "تقدير يبدأ من"}</span>
              <span className="cz__est-price">{formatPrice(est, cur, lang)}</span>
            </div>
            <a className="btn btn--primary btn--lg" href={waLink} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={20} />
              <span>{t(cz.cta, lang)}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { ProductPage, CustomisePage });
