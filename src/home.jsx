/* ============================================================================
   Vyella® — home: Hero, About
   ========================================================================== */

const { useEffect } = React;
const { t, Icon, Btn, Sticker } = window;

/* ---------------- HERO ---------------- */
function Hero({ lang, cur, go }) {
  const h = window.VyellaContent.hero;
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const onScroll = () => {
      hero.classList.toggle("scrolled", window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="hero" id="top">
      <div className="wrap hero__inner">
        <div className="first_hero">
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
        </div>
      </div>

      <div className="hero__photo">
        <image-slot
          id="hero-main"
          shape="rect"
          src="assets/hero-berry-bliss.jpg"
          fit="cover"
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

Object.assign(window, {
  Hero,
  About,
});
