/* ============================================================================
   Vyella® — shared helpers, icons, and primitive components
   Exports everything to window for the other babel scripts.
   ========================================================================== */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* ---- language helper ---- */
const t = (v, lang) =>
  v && typeof v === "object" && ("en" in v || "ar" in v) ? v[lang] : v;

/* ---- currency formatting ---- */
function formatPrice(aed, cur, lang) {
  const C = window.VyellaContent.currency;
  const rate = C.rates[cur] || 1;
  const step = C.round[cur] || 1;
  let val = aed * rate;
  val = Math.round(val / step) * step;
  const sym = t(C.symbol[cur], lang);
  // Arabic-Indic digits for AR
  const num = val.toLocaleString(lang === "ar" ? "ar-EG" : "en-US");
  return lang === "ar" ? `${num} ${sym}` : `${sym} ${num}`;
}

/* =========================================================================
   ICONS — single source. All inherit currentColor.
   ========================================================================= */
function Icon({ name, size = 24, stroke = 2.2 }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" {...p} />
        <circle cx="12" cy="12" r="4" {...p} />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),

    pinterest: (
      <>
        <circle cx="12" cy="12" r="9" {...p} />
        <path
          d="M12 7.5c-2 0-3.3 1.3-3.3 3 0 .9.4 1.7 1.1 2M12 7.5c2 0 3.3 1.1 3.3 2.8 0 2-1.1 3.4-2.6 3.4-.8 0-1.4-.6-1.2-1.4l.6-2.6M11 17l1-4"
          {...p}
        />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" {...p} />,
    arrowBack: <path d="M19 12H5M11 6l-6 6 6 6" {...p} />,
    plus: <path d="M12 5v14M5 12h14" {...p} />,
    minus: <path d="M5 12h14" {...p} />,
    truck: (
      <>
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" {...p} />
        <circle cx="7" cy="17.5" r="1.8" {...p} />
        <circle cx="17.5" cy="17.5" r="1.8" {...p} />
      </>
    ),
    hand: (
      <path
        d="M7 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1V4.5a1.5 1.5 0 0 1 3 0V11m0-.5V6a1.5 1.5 0 0 1 3 0v7c0 3.5-2.2 6-6 6-2 0-3.2-.7-4.3-2L4 13.5c-.6-.9.3-2 1.3-1.7L7 12.5"
        {...p}
      />
    ),
    leaf: (
      <>
        <path d="M4 20C4 11 11 5 20 5c0 9-6 15-15 15-.4 0-.7 0-1 0z" {...p} />
        <path d="M4 20c3-5 7-8 12-9" {...p} />
      </>
    ),
    gift: (
      <>
        <rect x="4" y="9" width="16" height="11" rx="1.5" {...p} />
        <path
          d="M4 13h16M12 9v11M12 9c-1.5-3-5-3-5-1 0 1.3 2 1 5 1zM12 9c1.5-3 5-3 5-1 0 1.3-2 1-5 1z"
          {...p}
        />
      </>
    ),
    flame: (
      <path
        d="M12 3c1 3.5 5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.2 2.2-4.3C10 9 11 7 12 3z"
        {...p}
      />
    ),
    drop: (
      <path
        d="M12 4c-3 4.5-5 7-5 9.5a5 5 0 0 0 10 0C17 11 15 8.5 12 4z"
        {...p}
      />
    ),
    ruler: (
      <>
        <rect x="3" y="8" width="18" height="8" rx="1.5" {...p} />
        <path d="M7 8v3M11 8v4M15 8v3M19 8v4" {...p} />
      </>
    ),
    pin: (
      <>
        <path d="M12 21c4-5 7-8.5 7-12a7 7 0 1 0-14 0c0 3.5 3 7 7 12z" {...p} />
        <circle cx="12" cy="9" r="2.5" {...p} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" {...p} />
        <path d="M12 7v5l3 2" {...p} />
      </>
    ),
    phone: (
      <path
        d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L17 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        {...p}
      />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" {...p} />
        <path d="M3 7l9 6 9-6" {...p} />
      </>
    ),
    star: (
      <path
        d="M12 3l2.5 6 6.5.5-5 4.2 1.6 6.3L12 17l-5.6 3 1.6-6.3-5-4.2 6.5-.5z"
        fill="currentColor"
        stroke="none"
      />
    ),
    sparkle: (
      <path
        d="M12 3c.6 4 1.5 4.9 5.5 5.5C13.5 9 12.6 10 12 14c-.6-4-1.5-4.9-5.5-5.5C10.5 8 11.4 7 12 3z"
        fill="currentColor"
        stroke="none"
      />
    ),
    check: <path d="M5 12.5l4.5 4.5L19 7" {...p} />,
    whatsapp: (
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3z" {...p} />
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" {...p} />,
    close: <path d="M6 6l12 12M18 6L6 18" {...p} />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" {...p} />
        <path
          d="M12 3c2.5 2.8 4 6.5 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.5-4 9s1.5 6.2 4 9M3 12h18"
          {...p}
        />
      </>
    ),
    currency: (
      <>
        <circle cx="12" cy="12" r="9" {...p} />
        <path
          d="M12 6v12M15 9c0-1.1-1.3-2-3-2s-3 .9-3 2 1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2"
          {...p}
        />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {paths[name]}
    </svg>
  );
}

/* ---- social icon row (icons only) ---- */
function SocialIcons({ size = 20, className = "" }) {
  const s = window.VyellaContent.social;
  return (
    <div className={`social-icons ${className}`}>
      <a
        href={s.instagram}
        target="_blank"
        rel="noopener"
        aria-label="Instagram"
      >
        <Icon name="instagram" size={size} />
      </a>
      <a
        href={s.pinterest}
        target="_blank"
        rel="noopener"
        aria-label="Pinterest"
      >
        <Icon name="pinterest" size={size} />
      </a>
      <a href={s.tiktok} target="_blank" rel="noopener" aria-label="TikTok">
        <Icon name="tiktok" size={size} />
      </a>
    </div>
  );
}

/* ---- button ---- */
function Btn({
  as = "a",
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  children,
  className = "",
  ...rest
}) {
  const Tag = as;
  return (
    <Tag className={`btn btn--${variant} btn--${size} ${className}`} {...rest}>
      {icon && <Icon name={icon} size={size === "lg" ? 20 : 18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 20 : 18} />}
    </Tag>
  );
}

/* ---- section header ---- */
function SectionHead({ eyebrow, title, sub, align = "start", tone, lang }) {
  return (
    <div className={`sec-head sec-head--${align}`} data-tone={tone}>
      {eyebrow && (
        <div className="eyebrow sec-head__eyebrow">{t(eyebrow, lang)}</div>
      )}
      {title && <h2 className="sec-head__title">{t(title, lang)}</h2>}
      {sub && <p className="sec-head__sub">{t(sub, lang)}</p>}
    </div>
  );
}

/* ---- sticker ---- */
function Sticker({
  variant = "pink",
  shape = "pill",
  rot = 0,
  children,
  className = "",
}) {
  return (
    <span
      className={`sticker sticker--${shape} sticker--${variant} ${className}`}
      style={{ "--rot": `${rot}deg` }}
    >
      {children}
    </span>
  );
}

/* ---- price (currency-aware) ---- */
function Price({ aed, cur, lang, from }) {
  return (
    <span className="price">
      {from && (
        <span className="price__from">
          {t(window.VyellaContent.ui.from, lang)}{" "}
        </span>
      )}
      {formatPrice(aed, cur, lang)}
    </span>
  );
}

Object.assign(window, {
  t,
  formatPrice,
  Icon,
  SocialIcons,
  Btn,
  SectionHead,
  Sticker,
  Price,
});
