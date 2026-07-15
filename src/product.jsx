/* ============================================================================
   Vyella® — Product detail page + Customise page + booking flow
   ========================================================================== */

const { useState, useEffect, useRef } = React;
const { t, formatPrice, Icon, Btn, SectionHead, Sticker, ProductCard } = window;

const EMPTY_CUSTOMER = { name: "", phone: "", address: "" };

function validateCustomer(fields, lang, extra = {}) {
  const b = window.VyellaContent.booking.errors;
  const errors = {};
  if (!fields.name.trim()) errors.name = t(b.name, lang);
  if (!fields.phone.trim()) errors.phone = t(b.phone, lang);
  else if (!/^[\d\s+\-().]{7,}$/.test(fields.phone.trim()))
    errors.phone = t(b.phoneInvalid, lang);
  if (!fields.address.trim()) errors.address = t(b.address, lang);
  if (extra.scent === false) errors.scent = t(b.scent, lang);
  if (extra.look === false) errors.look = t(b.look, lang);
  return errors;
}

function buildCopyText(sections, lang) {
  return sections
    .flatMap(({ items }) =>
      items.map(({ label, value }) => `${label}:\n${value}`),
    )
    .join("\n\n");
}

/* ---- customer form ---- */
function BookingCustomerFields({ customer, errors, onChange, lang }) {
  const b = window.VyellaContent.booking;
  const fields = [
    { key: "name", label: b.fullName, type: "text", autoComplete: "name" },
    { key: "phone", label: b.phone, type: "tel", autoComplete: "tel" },
    {
      key: "address",
      label: b.address,
      type: "textarea",
      autoComplete: "street-address",
    },
  ];

  return (
    <div className="book-form">
      <div className="pdp__sub-label book-form__heading">
        {t(b.yourDetails, lang)}
      </div>
      {fields.map(({ key, label, type, autoComplete }) => (
        <div className="book-form__field" key={key}>
          <label className="book-form__label" htmlFor={`book-${key}`}>
            {t(label, lang)}
            <span className="book-form__req" aria-hidden="true">
              *
            </span>
            <span className="visually-hidden">{t(b.required, lang)}</span>
          </label>
          {type === "textarea" ? (
            <textarea
              id={`book-${key}`}
              className={`book-form__input book-form__textarea ${errors[key] ? "is-error" : ""}`}
              rows={3}
              value={customer[key]}
              onChange={(e) => onChange(key, e.target.value)}
              autoComplete={autoComplete}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `book-${key}-error` : undefined}
            />
          ) : (
            <input
              id={`book-${key}`}
              type={type}
              className={`book-form__input ${errors[key] ? "is-error" : ""}`}
              value={customer[key]}
              onChange={(e) => onChange(key, e.target.value)}
              autoComplete={autoComplete}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `book-${key}-error` : undefined}
            />
          )}
          {errors[key] && (
            <span
              className="book-form__error"
              id={`book-${key}-error`}
              role="alert"
            >
              {errors[key]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---- confirmation modal ---- */
function BookingConfirmModal({ open, onClose, sections, copyText, lang }) {
  const b = window.VyellaContent.booking;
  const dialogRef = useRef(null);
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setCopying(false);
      return;
    }
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = copyText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const instagramUrl = window.VyellaContent.social.instagramDm;

  const handleInstagram = async () => {
    setCopying(true);

    await copyOrder();

    showToast(
      lang === "en"
        ? "Order copied! Paste it into the Instagram chat."
        : "تم نسخ بيانات الطلب، الصقها في محادثة إنستجرام.",
    );

    setCopying(false);

    setTimeout(() => {
      window.location.href = instagramUrl;
    }, 1000);
  };

  return (
    <div
      className="book-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="book-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="book-modal__close"
          onClick={onClose}
          aria-label={t(b.close, lang)}
        >
          <Icon name="close" size={20} />
        </button>

        <h2 className="book-modal__title" id="book-modal-title">
          {t(b.confirmTitle, lang)}
        </h2>
        <p className="book-modal__sub">{t(b.confirmSub, lang)}</p>

        <div className="book-modal__body">
          {sections.map(({ title, items }) => (
            <div className="book-modal__section" key={title}>
              <h3 className="book-modal__section-title">{title}</h3>
              <dl className="book-modal__list">
                {items.map(({ label, value }) => (
                  <div className="book-modal__row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="book-modal__actions">
          <Btn
            as="button"
            variant="outline"
            size="lg"
            icon="instagram"
            className="book-modal__instagram"
            onClick={handleInstagram}
            disabled={copying}
          >
            {t(b.confirmInstagram, lang)}
          </Btn>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

/* ---------------- PRODUCT DETAIL ---------------- */
function ProductPage({ id, lang, cur, go }) {
  const C = window.VyellaContent;
  const d = C.detail;
  const bk = C.booking;
  const all = C.products;
  const p = all.find((x) => x.id === id);

  const [sizeKey, setSizeKey] = useState("classic");
  const [qty, setQty] = useState(1);
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [fieldErrors, setFieldErrors] = useState({});
  const [preparing, setPreparing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSizeKey("classic");
    setQty(1);
    setCustomer(EMPTY_CUSTOMER);
    setFieldErrors({});
    setModalOpen(false);
  }, [id]);

  if (!p) {
    return (
      <div className="wrap" style={{ padding: "120px 0", textAlign: "center" }}>
        <h2>Not found</h2>
        <Btn as="button" variant="primary" onClick={() => go("#/shop")}>
          {t(C.ui.shopAll, lang)}
        </Btn>
      </div>
    );
  }

  const size = C.sizes.find((s) => s.key === sizeKey);
  const unitPrice = p.base + size.delta;
  const total = unitPrice * qty;

  const related = all
    .filter((x) => x.id !== id && x.family === p.family)
    .slice(0, 3);
  const relatedFill =
    related.length < 3
      ? related.concat(
          all
            .filter((x) => x.id !== id && !related.includes(x))
            .slice(0, 3 - related.length),
        )
      : related;

  const updateCustomer = (key, value) => {
    setCustomer((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleBook = () => {
    const errors = validateCustomer(customer, lang);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setPreparing(true);
    setTimeout(() => {
      setPreparing(false);
      setModalOpen(true);
    }, 450);
  };

  const modalSections = [
    {
      title: t(bk.customerInfo, lang),
      items: [
        { label: t(bk.fullName, lang), value: customer.name.trim() },
        { label: t(bk.phone, lang), value: customer.phone.trim() },
        { label: t(bk.address, lang), value: customer.address.trim() },
      ],
    },
    {
      title: t(bk.orderInfo, lang),
      items: [
        { label: t(bk.product, lang), value: t(p.name, lang) },
        {
          label: t(bk.size, lang),
          value: `${t(size.label, lang)} (${size.oz})`,
        },
        { label: t(bk.quantity, lang), value: String(qty) },
        {
          label: t(bk.totalPrice, lang),
          value: formatPrice(total, cur, lang),
        },
      ],
    },
  ];

  const copyText = buildCopyText(modalSections, lang);

  return (
    <main className="pdp">
      <div className="wrap pdp__back">
        <button className="pdp__back-btn" onClick={() => go("#/shop")}>
          <Icon name="arrowBack" size={18} /> {t(C.ui.back, lang)}
        </button>
      </div>

      <div className="wrap pdp__grid">
        <div className="pdp__media">
          <div className="pdp__photo">
            <image-slot
              id={`pdp-${p.id}`}
              shape="rect"
              src={p.img}
              fit="contain"
              placeholder={t(p.name, lang)}
              style={{ width: "100%", height: "100%", display: "block" }}
            ></image-slot>
            {p.flags.includes("new") && (
              <Sticker
                variant="lime"
                shape="pill"
                rot={-6}
                className="pdp__flag"
              >
                {lang === "en" ? "new" : "جديد"}
              </Sticker>
            )}
            {p.flags.includes("bestseller") && !p.flags.includes("new") && (
              <Sticker
                variant="tang"
                shape="pill"
                rot={-6}
                className="pdp__flag"
              >
                {lang === "en" ? "bestseller" : "الأكثر مبيعاً"}
              </Sticker>
            )}
          </div>
          <div className="pdp__trust">
            <span>
              <Icon name="hand" size={18} /> {t(d.trust1, lang)}
            </span>
            <span>
              <Icon name="truck" size={18} /> {t(d.trust2, lang)}
            </span>
            <span>
              <Icon name="leaf" size={18} /> {t(d.trust3, lang)}
            </span>
          </div>
        </div>

        <div className="pdp__info">
          <div className="eyebrow pdp__fam">
            {t(C.shop.scentFamilies[p.family], lang)}
          </div>
          <h1 className="pdp__name">{t(p.name, lang)}</h1>
          <p className="pdp__scent">{t(p.scent, lang)}</p>
          <div className="pdp__price">{formatPrice(unitPrice, cur, lang)}</div>

          <p className="pdp__desc">{t(p.desc, lang)}</p>

          <div className="pdp__notes">
            <div className="pdp__sub-label">{t(d.scentNotes, lang)}</div>
            <div className="pdp__notes-row">
              <div className="pdp__note">
                <span className="pdp__note-k">
                  {lang === "en" ? "Scent Notes" : "النفحات العطرية"}
                </span>

                <span className="pdp__note-v">{t(p.notes, lang)}</span>
              </div>
            </div>
          </div>

          <div className="pdp__block">
            <div className="pdp__sub-label">{t(d.chooseSize, lang)}</div>
            <div className="pdp__sizes">
              {C.sizes.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`pdp__size ${sizeKey === s.key ? "is-active" : ""}`}
                  onClick={() => setSizeKey(s.key)}
                >
                  <span className="pdp__size-name">{t(s.label, lang)}</span>
                  <span className="pdp__size-meta">
                    {s.oz} · {s.hrs} {t(d.perHrs, lang)}
                  </span>
                  <span className="pdp__size-price">
                    {formatPrice(p.base + s.delta, cur, lang)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <BookingCustomerFields
            customer={customer}
            errors={fieldErrors}
            onChange={updateCustomer}
            lang={lang}
          />

          <div className="pdp__buy">
            <div className="pdp__qty">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="decrease"
              >
                <Icon name="minus" size={18} />
              </button>
              <span>{lang === "ar" ? qty.toLocaleString("ar-EG") : qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                aria-label="increase"
              >
                <Icon name="plus" size={18} />
              </button>
            </div>
            <button
              type="button"
              className="btn btn--primary btn--lg pdp__reserve"
              onClick={handleBook}
              disabled={preparing}
              aria-busy={preparing}
            >
              {preparing ? (
                <span>{t(bk.preparing, lang)}</span>
              ) : (
                <span>
                  {t(d.reserve, lang)} · {formatPrice(total, cur, lang)}
                </span>
              )}
            </button>
          </div>
          <p className="pdp__reserve-note">{t(d.reserveNote, lang)}</p>
        </div>
      </div>

      <div className="wrap pdp__related">
        <h2 className="pdp__related-title">{t(d.youMayLike, lang)}</h2>
        <div className="shop__grid">
          {relatedFill.map((rp) => (
            <ProductCard
              key={rp.id}
              p={rp}
              idx={all.indexOf(rp)}
              lang={lang}
              cur={cur}
              go={go}
            />
          ))}
        </div>
      </div>

      <BookingConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sections={modalSections}
        copyText={copyText}
        lang={lang}
      />
    </main>
  );
}

/* ---------------- CUSTOMISE PAGE ---------------- */
function CustomisePage({ lang, cur, go }) {
  const C = window.VyellaContent;
  const cz = C.customize;
  const bk = C.booking;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [size, setSize] = useState("classic");
  const [scent, setScent] = useState(null);
  const [look, setLook] = useState(null);
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [customDescription, setCustomDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [preparing, setPreparing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const scents = ["sweet", "warm", "fruity", "rich"];
  const looks = [
    { key: "as-shown", label: { en: "classic dessert", ar: "ديزرت كلاسيك" } },
    { key: "minimal", label: { en: "minimal & soft", ar: "بسيط وناعم" } },
    { key: "bold", label: { en: "bold & colourful", ar: "جريء وملوّن" } },
    { key: "surprise", label: { en: "surprise me", ar: "فاجئيني" } },
  ];

  const base = 50;
  const sz = C.sizes.find((s) => s.key === size);
  const est = base + sz.delta;
  const lookLabel = look ? looks.find((l) => l.key === look)?.label : null;

  const updateCustomer = (key, value) => {
    setCustomer((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleBook = () => {
    const errors = validateCustomer(customer, lang, {
      scent: !!scent,
      look: !!look,
    });
    if (!customDescription.trim()) {
      errors.customDescription =
        lang === "en"
          ? "Please describe your custom design."
          : "يرجى وصف التصميم الذي تريده.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setPreparing(true);
    setTimeout(() => {
      setPreparing(false);
      setModalOpen(true);
    }, 450);
  };

  const modalSections = [
    {
      title: t(bk.customerInfo, lang),
      items: [
        { label: t(bk.fullName, lang), value: customer.name.trim() },
        { label: t(bk.phone, lang), value: customer.phone.trim() },
        { label: t(bk.address, lang), value: customer.address.trim() },
      ],
    },
    {
      title: t(bk.customInfo, lang),
      items: [
        {
          label: t(bk.size, lang),
          value: `${t(sz.label, lang)} (${sz.oz})`,
        },
        {
          label: t(bk.scent, lang),
          value: t(C.shop.scentFamilies[scent], lang),
        },
        {
          label: t(bk.look, lang),
          value: t(lookLabel, lang),
        },
        {
          label: lang === "en" ? "Custom Description" : "وصف التصميم",
          value: customDescription.trim(),
        },
        {
          label: t(bk.estimatedPrice, lang),
          value: formatPrice(est, cur, lang),
        },
      ],
    },
  ];

  const copyText = buildCopyText(modalSections, lang);

  return (
    <main className="custom-page">
      <div className="wrap pdp__back">
        <button className="pdp__back-btn" onClick={() => go("#/shop")}>
          <Icon name="arrowBack" size={18} /> {t(C.ui.back, lang)}
        </button>
      </div>
      <div className="wrap">
        <SectionHead
          eyebrow={cz.eyebrow}
          title={cz.title}
          sub={cz.sub}
          align="center"
          lang={lang}
        />

        <div className="cz">
          <div className="cz__step">
            <div className="cz__head">
              <span className="cz__no">01</span>
              <h3>{t(cz.steps[0].label, lang)}</h3>
            </div>
            <div className="cz__opts">
              {C.sizes.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`cz__opt ${size === s.key ? "is-active" : ""}`}
                  onClick={() => setSize(s.key)}
                >
                  <span className="cz__opt-name">{t(s.label, lang)}</span>
                  <span className="cz__opt-meta">
                    {s.oz} · {s.hrs} {t(C.detail.perHrs, lang)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="cz__step">
            <div className="cz__head">
              <span className="cz__no">02</span>
              <h3>{t(cz.steps[1].label, lang)}</h3>
            </div>
            <div className="cz__opts cz__opts--scent">
              {scents.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`cz__opt ${scent === s ? "is-active" : ""}`}
                  onClick={() => {
                    setScent(s);
                    if (fieldErrors.scent) {
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.scent;
                        return next;
                      });
                    }
                  }}
                >
                  <span className="cz__opt-name">
                    {t(C.shop.scentFamilies[s], lang)}
                  </span>
                </button>
              ))}
            </div>
            {fieldErrors.scent && (
              <span className="book-form__error cz__error" role="alert">
                {fieldErrors.scent}
              </span>
            )}
          </div>

          <div className="cz__step">
            <div className="cz__head">
              <span className="cz__no">03</span>
              <h3>{t(cz.steps[2].label, lang)}</h3>
            </div>
            <div className="cz__opts cz__opts--scent">
              {looks.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  className={`cz__opt ${look === l.key ? "is-active" : ""}`}
                  onClick={() => {
                    setLook(l.key);
                    if (fieldErrors.look) {
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.look;
                        return next;
                      });
                    }
                  }}
                >
                  <span className="cz__opt-name">{t(l.label, lang)}</span>
                </button>
              ))}
            </div>
            {fieldErrors.look && (
              <span className="book-form__error cz__error" role="alert">
                {fieldErrors.look}
              </span>
            )}
          </div>

          <div className="cz__step">
            <div className="cz__head">
              <span className="cz__no">04</span>
              <h3>
                {lang === "en"
                  ? "Describe your custom design"
                  : "اوصف التصميم الذي تريده"}
              </h3>
            </div>

            <textarea
              className={`book-form__textarea ${
                fieldErrors.customDescription ? "is-error" : ""
              }`}
              rows={6}
              placeholder={
                lang === "en"
                  ? "Describe your idea, colors, theme, inspiration, references, special requests..."
                  : "اشرح بالتفصيل الشكل الذي تريده، الألوان، الثيم، الأفكار، أو أي ملاحظات خاصة..."
              }
              value={customDescription}
              onChange={(e) => {
                setCustomDescription(e.target.value);

                if (fieldErrors.customDescription) {
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next.customDescription;
                    return next;
                  });
                }
              }}
            />

            {fieldErrors.customDescription && (
              <span className="book-form__error cz__error">
                {fieldErrors.customDescription}
              </span>
            )}
          </div>

          <BookingCustomerFields
            customer={customer}
            errors={fieldErrors}
            onChange={updateCustomer}
            lang={lang}
          />

          <div className="cz__summary">
            <div className="cz__est">
              <span className="cz__est-label">
                {lang === "en" ? "estimated from" : "تقدير يبدأ من"}
              </span>
              <span className="cz__est-price">
                {formatPrice(est, cur, lang)}
              </span>
            </div>
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={handleBook}
              disabled={preparing}
              aria-busy={preparing}
            >
              {preparing ? (
                <span>{t(bk.preparing, lang)}</span>
              ) : (
                <span>{t(cz.cta, lang)}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <BookingConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sections={modalSections}
        copyText={copyText}
        lang={lang}
      />
    </main>
  );
}

Object.assign(window, { ProductPage, CustomisePage });
