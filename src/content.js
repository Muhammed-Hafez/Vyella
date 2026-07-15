/* ============================================================================
   Vyella® — bilingual content (EN / AR)
   UAE-based handmade dessert candle studio.
   Every string is { en, ar }. Helper t(value, lang) picks the language.
   ========================================================================== */

window.VyellaContent = {
  /* ---- currencies (base price stored in AED) ---- */
  currency: {
    base: "AED",
    rates: { AED: 1, USD: 0.272, EGP: 13.6 },
    symbol: {
      AED: { en: "AED", ar: "د.إ" },
      USD: { en: "$", ar: "$" },
      EGP: { en: "EGP", ar: "ج.م" },
    },
    round: { AED: 1, USD: 1, EGP: 10 },
  },

  /* ---- top announcement ---- */
  announce: {
    en: "🕯  new in 2026  ·  handmade dessert candles, shipped across the GCC & Egypt  ·  reserve yours now  ·  ",
    ar: "🕯  جديد ٢٠٢٦  ·  شموع ديزرت هاند ميد، شحن لكل دول الخليج ومصر  · احجز شمعتك دلوقتي  ·  ",
  },

  /* ---- utility / nav ---- */
  ui: {
    langSwitch: { en: "العربية", ar: "EN" },
    reserve: { en: "reserve", ar: "احجز" },
    reserveThis: { en: "reserve this candle", ar: "احجز الشمعة دي" },
    viewDetails: { en: "view candle", ar: "شوف التفاصيل" },
    from: { en: "from", ar: "يبدأ من" },
    back: { en: "back to shop", ar: "ارجع للمتجر" },
    customize: { en: "customise it", ar: "اعملها بطريقتك" },
    shopAll: { en: "shop all candles", ar: "تسوق كل الشموع" },
    menu: { en: "menu", ar: "القائمة" },
  },

  nav: {
    about: { en: "about", ar: "عن فييلا" },
    shop: { en: "shop", ar: "المتجر" },
    custom: { en: "customise", ar: "تخصيص" },
    process: { en: "how it's made", ar: "طريقة الصنع" },
    contact: { en: "contact", ar: "تواصل" },
  },

  /* ============================ 1 · HERO ============================ */
  hero: {
    wordmark: "vyella",
    slogan1: { en: "too pretty to burn.", ar: "أحلى من إنها تتولّع." },
    slogan2: { en: "burn itanyway.", ar: "ولّعها برضه." },
    sub: {
      en: "Handmade dessert candles, poured by hand in Dubai. Natural soy & gel wax, shipped across the GCC and Egypt.",
      ar: "شموع ديزرت هاند ميد، مصبوبة بإيدينا في دبي. شمع صويا وجل طبيعي، وشحن لكل دول الخليج ومصر.",
    },
    ctaShop: { en: "shop the candles", ar: "تسوق الشموع" },
    ctaCustom: { en: "design your own", ar: "صمّم شمعتك" },
  },

  /* ============================ 2 · ABOUT ============================ */
  about: {
    eyebrow: { en: "WHO WE ARE", ar: "مين إحنا" },
    title: {
      en: "we make wax\nthat looks like dessert.",
      ar: "بنعمل شمع\nشكله زي الحلويات.",
    },
    body: {
      en: "Vyella is a UAE-based candle studio making hyper-realistic, handcrafted dessert candles. Every piece is sculpted, poured, and painted by hand in small batches — from natural soy wax and clean fragrance oils. Cute enough to display, made to actually light.",
      ar: "فييلا ستوديو شموع في الإمارات بيعمل شموع ديزرت هاند ميد بتشبه الحلويات الحقيقية. كل قطعة بتتنحت وبتتصب وبتتلوّن بإيد في كميات صغيرة — من شمع صويا طبيعي وزيوت عطرية نظيفة. حلوة كفاية تتعرض، ومعمولة علشان تتولّع فعلاً.",
    },
    cta: { en: "our story", ar: "قصتنا" },
  },

  /* ============================ 3 · PRODUCTS ============================ */
  shop: {
    eyebrow: { en: "THE SHOP", ar: "المتجر" },
    title: {
      en: "handmade candles,\nmade to order.",
      ar: "شموع هاند ميد،\nبتتعمل لطلبك.",
    },
    tabs: {
      newArrivals: { en: "new arrivals", ar: "وصل حديثاً" },
      bestSellers: { en: "best sellers", ar: "الأكثر مبيعاً" },
      byScent: { en: "shop by scent", ar: "تسوق حسب الريحة" },
    },
    scentFamilies: {
      all: { en: "all", ar: "الكل" },
      sweet: { en: "sweet & creamy", ar: "حلو وكريمي" },
      warm: { en: "warm & spiced", ar: "دافي ومتبّل" },
      fruity: { en: "fruity & fresh", ar: "فواكه ومنعش" },
      rich: { en: "rich & decadent", ar: "غني وفخم" },
    },
    customBanner: {
      eyebrow: { en: "MAKE IT YOURS", ar: "اعملها بطريقتك" },
      title: { en: "design your own candle", ar: "صمّم شمعتك بنفسك" },
      body: {
        en: "Pick the size, choose the scent, and set the shape and colours. Custom dessert candles for weddings, birthdays, and brand gifting across the UAE.",
        ar: "اختاري الحجم، حدّدي الريحة، وظبطي الشكل والألوان. شموع ديزرت مخصّصة للأفراح وأعياد الميلاد وهدايا البراندات في كل الإمارات.",
      },
      cta: { en: "start customising", ar: "ابدء التخصيص" },
    },
  },

  /* product catalogue — flat price 50 AED each */
  products: [
    {
      id: "berry-croissant",
      img: "assets/prod-croissant.png",
      name: { en: "Croissant Candle", ar: " شمعة الكرواسون " },
      scent: { en: "Raspberries", ar: "التوت الاحمر" },
      family: "sweet",
      flags: ["bestseller"],
      base: 40,
      desc: {
        en: "A flaky croissant candle, hand-sculpted and crowned with whipped wax cream, plump raspberries and caramelised pastry curls. Buttery vanilla meets bright raspberry — bakery-fresh, and far too pretty to burn.",
        ar: "شمعة كرواسون مقرمشة منحوتة بالإيد، فوقها كريمة شمع وتوت ممتلئ وقطع باتيه بالكراميل. زبدة وفانيليا مع توت منعش — ريحة فرن طازة، وأحلى من إنها تتولّع.",
      },
      notes: {
        en: "Raspberries",
        ar: "التوت الاحمر",
      },
    },
    {
      id: "loaded-cookie",
      img: "assets/prod-cookie.png",
      name: { en: "Cookie Stack", ar: "كوكي ستاك" },
      scent: { en: "Caramel Cookie", ar: "كاراميل كوكي" },
      family: "rich",
      flags: ["new"],
      base: 40,
      desc: {
        en: "A fully-loaded chocolate-chip cookie candle, piled with a chocolate square, a mini biscuit, a wax strawberry and a swirl of cream. Warm milk chocolate over soft cookie dough — dessert you light, not eat.",
        ar: "شمعة كوكيز بالشيكولاتة محمّلة بالكامل، عليها مربع شيكولاتة وبسكوتة صغيرة وفراولة شمع ولفة كريمة. شيكولاتة بالحليب دافية فوق عجينة كوكيز ناعمة — ديزرت بتولّعيه مش بتاكليه.",
      },
      notes: {
        en: "Caramel Cookie",
        ar: "كاراميل كوكي",
      },
    },
    {
      id: "raspberry-cheesecake",
      img: "assets/prod-raspberry-cheesecake.png",
      name: { en: "Cheescake", ar: "شمعة التشيزكيك" },
      scent: {
        en: "strawberry",
        ar: "فراولة",
      },
      family: "rich",
      flags: ["bestseller"],
      base: 40,
      desc: {
        en: "A hand-poured cheesecake slice candle, finished with cream swirls, fresh raspberries and a sprig of mint. Smooth vanilla cheesecake on a biscuit base — creamy, calm, and gift-ready.",
        ar: "شريحة تشيز كيك مصبوبة بالإيد، عليها كريمة وتوت طازة وورقة نعناع. تشيز كيك فانيليا ناعم على قاعدة بسكوت — كريمي وهادي وجاهز كهدية.",
      },
      notes: {
        en: "Strawberry",
        ar: "فراولة",
      },
    },
    {
      id: "guava-sorbet",
      img: "assets/prod-guava-sorbet.png",
      name: { en: "Pink Crush", ar: " بينك كراش" },
      scent: { en: "Candy", ar: "كاندي" },
      family: "sweet",
      flags: ["new"],
      base: 40,
      desc: {
        en: "A scoop of pink guava sorbet candle resting on a soft shortcake, with a sugared lime slice on top. Juicy pink guava lifted by zesty lime — fresh, fruity and a little playful.",
        ar: "كورة سوربيه جوافة وردي فوق شورت كيك طري، وعليها شريحة ليمون مسكّرة. جوافة وردي منعشة مع ليمون حامض خفيف — فواكه فريش وشقية شوية.",
      },
      notes: {
        en: "Candy",
        ar: "كاندي",
      },
    },
    {
      id: "blueberry-french-toast",
      img: "assets/prod-french-toast.png",
      name: { en: "Toast Candle", ar: "شمعة التوست" },
      scent: { en: "Lemon & Mint", ar: "ليمون و نعناع" },
      family: "warm",
      flags: [],
      base: 40,
      desc: {
        en: "A stacked French toast candle, dusted with sugar and topped with whipped wax cream and blueberries. Warm maple and toasty brioche with a berry finish — a cosy morning in candle form.",
        ar: "شمعة فرنش توست متراصّة، مرشوشة سكر وفوقها كريمة شمع وبلوبيري. ميبل دافي وبريوش محمّص بلمسة توت — صباح دافي على هيئة شمعة.",
      },
      notes: {
        en: "Lemon & Mint",
        ar: "ليمون و نعناع",
      },
    },
    {
      id: "chocolate-waffle",
      img: "assets/prod-choc-waffle.png",
      name: { en: "Midnight Waffle", ar: "وافل الغروب" },
      scent: { en: "Rose", ar: "ورد" },
      family: "rich",
      flags: [],
      base: 40,
      desc: {
        en: "A rich cocoa waffle candle loaded with whipped cream, blueberries and a sugared lime. Deep chocolate waffle balanced by bright berries — indulgent without trying too hard.",
        ar: "شمعة وافل كاكاو غنية محمّلة بكريمة وبلوبيري وليمون مسكّر. وافل شيكولاتة عميق مع توت منعش — غني من غير مبالغة.",
      },
      notes: {
        en: "Rose",
        ar: "ورد",
      },
    },
    {
      id: "tiramisu-parfait",
      img: "assets/prod-tiramisu-parfait.png",
      name: { en: "Rassberry Icecream", ar: "ايس كريم التوت الاحمر" },
      scent: { en: "Raspberries", ar: "توت أحمر" },
      family: "rich",
      flags: ["new"],
      base: 55,
      desc: {
        en: "A layered parfait candle poured in a glass — coffee-soaked sponge, cream and cocoa, finished with wax raspberries. Deep espresso and cocoa for everyone who runs on coffee.",
        ar: "شمعة بارفيه طبقات مصبوبة في كوباية — كيك مشبّع بالقهوة وكريمة وكاكاو، وفوقها توت شمع. إسبريسو وكاكاو غامق لكل اللي عايشين على القهوة.",
      },
      notes: {
        en: "Raspberries",
        ar: "التوت الاحمر",
      },
    },
    {
      id: "strawberry-cake",
      img: "assets/prod-strawberry-cake.png",
      name: { en: "Birthday Cake", ar: "شمعة العيد ميلاد" },
      scent: { en: "Vanilla", ar: " فانيليا" },
      family: "fruity",
      flags: ["bestseller"],
      base: 40,
      desc: {
        en: "A mini strawberry cake candle with a glossy berry drip and whole wax strawberries on top. Sweet ripe strawberry over soft vanilla — the little cake you never have to slice.",
        ar: "شمعة تورتة فراولة صغيرة بطبقة توت لامعة وفراولة شمع كاملة فوق. فراولة حلوة ناضجة فوق فانيليا ناعمة — التورتة الصغيرة اللي مش هتحتاجي تقطعيها أبداً.",
      },
      notes: {
        en: "Vanilla",
        ar: "فانيليا",
      },
    },
    {
      id: "biscoff-cheesecake",
      img: "assets/prod-biscoff-cheesecake.png",
      name: { en: "Chocolate Drizzle", ar: " شمعة كيكة الشكولاتة " },
      scent: { en: "Oud", ar: "عود" },
      family: "rich",
      flags: ["new"],
      base: 40,
      desc: {
        en: "A decadent cheesecake slice candle drenched in caramel, piled with cocoa crunch, a chocolate square and a Biscoff biscuit. Spiced caramel biscuit meets creamy cheesecake — pure dessert drama.",
        ar: "شريحة تشيز كيك فخمة مغطّسة في كراميل، وفوقها كرانش كاكاو ومربع شيكولاتة وبسكوتة بسكوف. بسكوت كراميل متبّل مع تشيز كيك كريمي — ديزرت دراما بجد.",
      },
      notes: {
        en: "Oud",
        ar: "عود",
      },
    },
    {
      id: "ube-parfait",
      img: "assets/prod-ube-parfait.png",
      name: { en: "Blueberry Icecream", ar: "ايس كريم التوت الأزرق" },
      scent: { en: "Lavender", ar: "لافندر" },
      family: "sweet",
      flags: ["new"],
      base: 55,
      desc: {
        en: "A dreamy purple ube parfait candle, layered in a glass with coconut cream and sweet ube swirls. Soft, nutty ube and creamy coconut — the prettiest purple in the shop.",
        ar: "شمعة بارفيه أوبي بنفسجية حالمة، طبقات في كوباية مع كريمة جوز هند ولفّات أوبي حلوة. أوبي ناعم بطعم مكسرات وكريمة جوز هند — أحلى بنفسجي في المتجر.",
      },
      notes: {
        en: "Lavender",
        ar: "لافندر",
      },
    },
    {
      id: "iced-coffee",
      img: "assets/prod-iced-coffee.png",
      name: { en: "Iced Latte", ar: "آيس لاتيه" },
      scent: { en: "Coffee", ar: "قهوة" },
      family: "warm",
      flags: ["bestseller"],
      base: 55,
      desc: {
        en: "An iced coffee candle in a glass tumbler, complete with wax ice cubes and a wooden wick that crackles as it burns. Smooth cold brew softened with vanilla — your favourite order, on a shelf.",
        ar: "شمعة آيس كوفي في كباية زجاج، بمكعبات تلج شمع وفتيلة خشب بتطقطق وهي بتولّع. كولد برو ناعم مع فانيليا — أوردرك المفضّل، بس على الرف.",
      },
      notes: {
        en: "Coffee",
        ar: "قهوة",
      },
    },
    {
      id: "matcha",
      img: "assets/prod-matcha.png",
      name: { en: "Matcha", ar: "ماتشا" },
      scent: { en: "Vanilla Matcha Latte", ar: "ماتشا لاتيه فانيليا" },
      family: "sweet",
      flags: ["new"],
      base: 55,
      desc: {
        en: "An iced matcha latte candle, poured a soft sage green with wax ice cubes and a wooden wick. Earthy matcha rounded off with vanilla cream — calm in a glass.",
        ar: "شمعة آيس ماتشا لاتيه، مصبوبة بلون أخضر سيج ناعم بمكعبات تلج شمع وفتيلة خشب. ماتشا بطعم ترابي مع كريمة فانيليا — هدوء في كباية.",
      },
      notes: {
        en: "vanilla ",
        ar: "فانيليا",
      },
    },
  ],

  /* product sizes */
  sizes: [
    {
      key: "classic",
      label: { en: "Classic", ar: "كلاسيك" },
      oz: "3 oz / 85g",
      hrs: "15–20",
      delta: 0,
    },
    {
      key: "four",
      label: { en: "Grand", ar: "كبير" },
      oz: "4 oz / 113g",
      hrs: "20–25",
      delta: 15,
    },
  ],

  /* ============================ DETAIL PAGE ============================ */
  detail: {
    scentNotes: { en: "scent notes", ar: "نوتات الريحة" },
    top: { en: "top", ar: "البداية" },
    heart: { en: "heart", ar: "القلب" },
    base: { en: "base", ar: "القاعدة" },
    chooseSize: { en: "choose your size", ar: "اختاري الحجم" },
    burnTime: { en: "burn time", ar: "مدة الاشتعال" },
    quantity: { en: "quantity", ar: "الكمية" },
    reserve: { en: "book", ar: "احجز" },
    reserveNote: {
      en: "we'll confirm your order on instagram within a few hours.",
      ar: "هنأكد طلبك على انستغرام خلال ساعات قليلة.",
    },
    customizeToggle: {
      en: "make it custom instead",
      ar: "عايزها مخصّصة بدل كده",
    },
    customizeHint: {
      en: "change the scent, colours, or shape — we'll quote you back.",
      ar: "غيّر الريحة أو الألوان أو الشكل — وهنبعتلك السعر.",
    },
    trust1: { en: "handmade to order", ar: "هاند ميد حسب الطلب" },
    trust2: { en: "1–3 day uae delivery", ar: "توصيل ١–٣ أيام بالإمارات" },
    trust3: { en: "100% natural soy wax", ar: "شمع صويا طبيعي ١٠٠٪" },
    youMayLike: { en: "you may also like", ar: "ممكن كمان يعجبك" },
    perHrs: { en: "hrs", ar: "ساعة" },
  },

  /* ============================ 4 · CUSTOMISE ============================ */
  customize: {
    eyebrow: { en: "CUSTOMISE", ar: "تخصيص" },
    title: { en: "your candle,\nyour way.", ar: "شمعتك،\nبطريقتك." },
    sub: {
      en: "Build a one-of-a-kind dessert candle in three steps. Perfect for wedding favours, birthday gifts, and corporate gifting across the UAE.",
      ar: "اعملي شمعة ديزرت فريدة في ٣ خطوات. مثالية لتوزيعات الأفراح وهدايا أعياد الميلاد وهدايا الشركات في الإمارات.",
    },
    steps: [
      {
        no: "01",
        label: { en: "pick a size", ar: "اختار الحجم" },
        body: {
          en: "Petit, Classic, or Grand — from 4oz keepsakes to 8oz statement pieces.",
          ar: "صغير، وسط، أو كبير — من ٤ أونصة تذكارية لـ ٨ أونصة لافتة.",
        },
      },
      {
        no: "02",
        label: { en: "choose a scent", ar: "حدّد الريحة" },
        body: {
          en: "From sweet & creamy to rich & decadent — mix two if you like.",
          ar: "من الحلو الكريمي للغني الفخم — اخلطي اتنين لو حابة.",
        },
      },
      {
        no: "03",
        label: { en: "set the look", ar: "ظبط الشكل" },
        body: {
          en: "Shape, colours, and finishing touches — tell us your vibe.",
          ar: "الشكل والألوان واللمسات الأخيرة — قوليلنا على الفايب.",
        },
      },
    ],
    cta: { en: "book your custom candle", ar: "احجز شمعتك المخصّصة" },
  },

  /* ============================ BOOKING ============================ */
  booking: {
    yourDetails: { en: "your details", ar: "بياناتك" },
    fullName: { en: "full name", ar: "الاسم الكامل" },
    phone: { en: "phone number", ar: "رقم الهاتف" },
    address: { en: "address", ar: "العنوان" },
    required: { en: "required", ar: "مطلوب" },
    customerInfo: { en: "customer information", ar: "بيانات العميل" },
    orderInfo: { en: "order information", ar: "تفاصيل الطلب" },
    customInfo: { en: "customisation", ar: "التخصيص" },
    product: { en: "product", ar: "المنتج" },
    size: { en: "size", ar: "الحجم" },
    quantity: { en: "quantity", ar: "الكمية" },
    scent: { en: "scent", ar: "الريحة" },
    look: { en: "look", ar: "الشكل" },
    totalPrice: { en: "total price", ar: "السعر الإجمالي" },
    estimatedPrice: { en: "estimated price", ar: "السعر التقديري" },
    confirmTitle: { en: "confirm your booking", ar: "تأكيد الحجز" },
    confirmSub: {
      en: "review your details below, then copy and send via instagram.",
      ar: "راجعي التفاصيل، انسخيها، وابعتيها على انستغرام.",
    },
    copyOrder: { en: "copy order", ar: "انسخ الطلب" },
    copySuccess: { en: "copied!", ar: "تم النسخ!" },
    confirmInstagram: { en: "confirm via instagram", ar: "أكد عبر انستغرام" },
    preparing: { en: "preparing your order…", ar: "جاري تجهيز طلبك…" },
    close: { en: "close", ar: "إغلاق" },
    errors: {
      name: {
        en: "please enter your full name",
        ar: "من فضلك أدخلي اسمك الكامل",
      },
      phone: {
        en: "please enter your phone number",
        ar: "من فضلك أدخلي رقم هاتفك",
      },
      phoneInvalid: {
        en: "please enter a valid phone number",
        ar: "من فضلك أدخلي رقم هاتف صحيح",
      },
      address: { en: "please enter your address", ar: "من فضلك أدخلي عنوانك" },
      scent: { en: "please choose a scent", ar: "من فضلك اختاري الريحة" },
      look: { en: "please choose a look", ar: "من فضلك اختاري الشكل" },
    },
  },

  /* ============================ 5 · PROCESS / STEPS ============================ */
  process: {
    eyebrow: { en: "HOW IT'S MADE", ar: "طريقة الصنع" },
    title: { en: "four steps,\nby hand.", ar: "أربع خطوات،\nكلها بالإيد." },
    steps: [
      {
        no: "01",
        name: { en: "sculpt", ar: "نحت" },
        body: {
          en: "Every detail carved by hand — the drips, the berries, the crumbs.",
          ar: "كل تفصيلة بتتنحت بالإيد — القطرات، التوت، الفتات.",
        },
      },
      {
        no: "02",
        name: { en: "pour", ar: "صبّ" },
        body: {
          en: "Slow-poured natural soy wax for a clean, even, longer burn.",
          ar: "شمع صويا طبيعي بيتصب ببطء علشان اشتعال نظيف ومتساوي وأطول.",
        },
      },
      {
        no: "03",
        name: { en: "paint", ar: "تلوين" },
        body: {
          en: "Cosmetic-grade colour, dusted and brushed on by hand.",
          ar: "ألوان درجة كوزماتيك، بترش وبتترسم بالإيد.",
        },
      },
      {
        no: "04",
        name: { en: "finish", ar: "تشطيب" },
        body: {
          en: "Hand-tied, boxed, and ready to ship across the UAE.",
          ar: "بتتربط وبتتغلّف وجاهزة للشحن لكل الإمارات.",
        },
      },
    ],
  },

  /* ============================ 6 · DELIVERY / TRUST ============================ */
  trust: {
    items: [
      {
        icon: "truck",
        title: { en: "uae & egypt delivery", ar: "شحن للإمارات ومصر" },
        body: {
          en: "Shipped across the UAE & Egypt",
          ar: "بنشحن لكل الإمارات ومصر",
        },
      },
      {
        icon: "hand",
        title: { en: "100% handmade", ar: "هاند ميد ١٠٠٪" },
        body: {
          en: "Poured by hand, in small batches",
          ar: "مصبوبة بالإيد، بكميات صغيرة",
        },
      },
      {
        icon: "leaf",
        title: { en: "100% natural", ar: "طبيعي ١٠٠٪" },
        body: { en: "Clean natural soy wax", ar: "شمع صويا طبيعي نظيف" },
      },
      {
        icon: "gift",
        title: { en: "gift-ready", ar: "جاهزة كهدية" },
        body: {
          en: "Boxed and wrapped on request",
          ar: "بتتغلّف هدية حسب الطلب",
        },
      },
    ],
  },

  /* ============================ 7 · ACHIEVEMENTS ============================ */
  stats: {
    eyebrow: { en: "SINCE 2026", ar: "من سنة ٢٠٢٦" },
    title: { en: "fresh out\nof the studio.", ar: "لسه طالعين\nمن الستوديو." },
    items: [
      { n: "400+", label: { en: "candles poured", ar: "شمعة اتصبت" } },
      { n: "350+", label: { en: "happy clients", ar: "عميلة سعيدة" } },
      { n: "1.2M+", label: { en: "views online", ar: "مشاهدة أونلاين" } },
      { n: "5.0★", label: { en: "average rating", ar: "متوسط التقييم" } },
    ],
  },

  /* ============================ 8 · PRESS ============================ */
  press: {
    eyebrow: { en: "AS FEATURED IN", ar: "اتكلموا عننا في" },
    outlets: [
      { en: "Cairo Scene", ar: "كايرو سين" },
      { en: "Scoop Empire", ar: "سكوب إمباير" },
      { en: "Identity", ar: "إيدنتيتي" },
      { en: "Emirates Woman", ar: "إميرتس وومان" },
      { en: "Time Out", ar: "تايم آوت" },
    ],
  },

  /* ============================ 9 · FAQ ============================ */
  faq: {
    eyebrow: { en: "FAQ", ar: "أسئلة شائعة" },
    title: { en: "good to know.", ar: "حاجات تحب تعرفها." },
    items: [
      {
        q: {
          en: "Are these real candles I can burn?",
          ar: "دي شموع حقيقية أقدر أولّعها؟",
        },
        a: {
          en: "Yes. They're made from natural soy wax with a cotton wick — they look like dessert but burn like a proper candle.",
          ar: "أيوة. معمولة من شمع صويا طبيعي وفتيلة قطن — شكلها حلويات بس بتولّع زي أي شمعة عادية.",
        },
      },
      {
        q: { en: "Where do you ship?", ar: "بتشحنوا فين؟" },
        a: {
          en: "We're based in Dubai and ship across all the UAE, plus Egypt. Ready pieces go out in 1–3 days; custom orders take 2–3 weeks.",
          ar: "مقرّنا دبي وبنشحن لكل الإمارات، وكمان مصر. القطع الجاهزة بتطلع خلال ١–٣ أيام؛ والطلبات المخصّصة بتاخد ٢–٣ أسابيع.",
        },
      },
      {
        q: {
          en: "Can I customise size, scent, and shape?",
          ar: "أقدر أخصّص الحجم والريحة والشكل؟",
        },
        a: {
          en: "Absolutely — that's our favourite part. Use the customise option on any candle and we'll quote you back.",
          ar: "أكيد — ده أحلى جزء عندنا. استخدم خيار التخصيص على أي شمعة وهنبعتلك السعر.",
        },
      },
      {
        q: { en: "How do I care for my candle?", ar: "أعتني بالشمعة إزاي؟" },
        a: {
          en: "Trim the wick to 5mm, burn on a heat-safe surface, and keep first burns to 2–3 hours for an even melt.",
          ar: "قصّي الفتيلة لـ ٥ ملم، ولّعيها على سطح يتحمّل الحرارة، وخلي أول اشتعال ٢–٣ ساعات علشان يدوب بانتظام.",
        },
      },
      {
        q: {
          en: "Do you take bulk and event orders?",
          ar: "بتاخدوا طلبات بالجملة والمناسبات؟",
        },
        a: {
          en: "Yes — weddings, birthdays, and corporate gifting across the UAE. Message us with your date and quantity.",
          ar: "أيوة — أفراح وأعياد ميلاد وهدايا شركات في كل الإمارات. كلمينا بالتاريخ والكمية.",
        },
      },
    ],
  },

  /* ============================ 10 · INSTAGRAM ============================ */
  ig: {
    eyebrow: { en: "INSTAGRAM", ar: "انستجرام" },
    title: { en: "see us on the 'gram.", ar: "شوفونا على انستجرام." },
    handle: "@vyella.co",
    sub: {
      en: "New drops, behind-the-scenes pours, and real handmade candles in real homes across the UAE & Egypt.",
      ar: "كل جديد، وكواليس الصبّ، وشموع هاند ميد حقيقية في بيوت حقيقية في الإمارات ومصر.",
    },
    cta: { en: "follow @vyella.co", ar: "تابعينا @vyella.co" },
  },

  /* ============================ 11 · CONTACT ============================ */
  contact: {
    eyebrow: { en: "ORDER & CONTACT", ar: "اطلب وتواصل" },
    title: { en: "come say hi.", ar: "تعالى سلّم علينا." },
    studioLabel: { en: "BASED IN", ar: "موجودين في" },
    studio: {
      l1: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
      l2: {
        en: "Online studio — no walk-ins",
        ar: "ستوديو أونلاين — من غير زيارات",
      },
      l3: { en: "we ship UAE & Egypt", ar: "بنشحن للإمارات ومصر" },
    },
    hoursLabel: { en: "ONLINE HOURS", ar: "مواعيد الرد" },
    hours: [
      {
        d: { en: "SAT — THU", ar: "السبت — الخميس" },
        t: { en: "10 — 19", ar: "١٠ — ١٩" },
      },
      { d: { en: "FRI", ar: "الجمعة" }, t: { en: "14 — 19", ar: "١٤ — ١٩" } },
    ],
    phoneLabel: { en: "PHONE & WHATSAPP", ar: "تليفون وواتساب" },
    phone: "+971 582207509",
    emailLabel: { en: "EMAIL", ar: "إيميل" },
    email: "hello@vyella.co",
    socialLabel: { en: "FOLLOW", ar: "تابعنا" },
    mapCaption: {
      en: "Dubai, UAE · we ship UAE & Egypt",
      ar: "دبي، الإمارات · بنشحن للإمارات ومصر",
    },
    mapPin: { en: "based in dubai", ar: "مقرّنا دبي" },
  },

  /* ============================ FOOTER ============================ */
  footer: {
    tag: {
      en: "too pretty to burn.\nburn it anyway. 🕯",
      ar: "أحلى من إنها تتولّع.\nولّعها برضه. 🕯",
    },
    blurb: {
      en: "Handmade dessert candles · Dubai, UAE",
      ar: "شموع ديزرت هاند ميد · دبي، الإمارات",
    },
    colShop: { en: "SHOP", ar: "المتجر" },
    colStudio: { en: "STUDIO", ar: "الستوديو" },
    rights: {
      en: "© 2026 VYELLA® · handcrafted in the UAE",
      ar: "© ٢٠٢٦ فييلا® · مصنوعة يدوياً في الإمارات",
    },
  },

  /* social links */
  social: {
    instagram: "https://www.instagram.com/vyella.co/",
    instagramDm: "https://ig.me/m/vyella.co",
    tiktok: "https://www.tiktok.com/@vyella",
    pinterest: "https://pin.it/4wg0G7yiK",
  },
};
